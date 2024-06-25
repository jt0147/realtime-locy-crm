using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Models.DTOs.Notification;
using VslCrmApiRealTime.Models.Requests.Notification;
using VslCrmApiRealTime.Models.Responses;

namespace VslCrmApiRealTime.Hubs
{
    public class JobHub: Hub
    {
        // Dictionary to store connection ID based on username
        private static ConcurrentDictionary<string, string> _connections = new ConcurrentDictionary<string, string>();
        private readonly VslCrmContext _db;

        public JobHub(VslCrmContext db)
        {
            _db = db;
        }

        public override async Task OnConnectedAsync()
        {
            // Get user id from query string of URL
            var userId = Context.GetHttpContext()?.Request.Query["userId"].ToString();

            if (!string.IsNullOrEmpty(userId)) {
                // Store connection ID and username into dictionary
                _connections[userId] = Context.ConnectionId;
            }

            // Add connection ID to group job-notification
            await Groups.AddToGroupAsync(Context.ConnectionId, "job-notification");

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            // Get user id from query string of URL
            var userId = Context.GetHttpContext()?.Request.Query["userId"].ToString();

            if (!string.IsNullOrEmpty(userId))
            {
                // Remove connection ID from dictionary
                _connections.TryRemove(userId, out _);
            }

            // Remove connection ID from group job-notification
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "job-notification");
            await base.OnDisconnectedAsync(exception);
        }

        // Method to assign job
        public async Task NotifyJobAssignment(NotificationHubRequest req)
        {
            var notification = await _db.TblNotifyWebs.Where(x => x.Id == req.IDNotification).Select(x => new NotificationDto()
            {
                Id = x.Id,
                SenderId = x.IduserGui,
                ReceiverId = x.IduserNhan,
                RelatedId = x.IduserLienQuan,
                SenderMessage = x.IddmmessNavigation.MessageSender ?? "",
                ReceiverMessage = x.IddmmessNavigation.MessageReceiver ?? "",
                RelatedMessage = x.IddmmessNavigation.MessageRelated ?? "",
                IdMess = x.Iddmmess,
                IsRead = x.IsRead,
                CreatedAt = x.DateCreate != null ? string.Format("{0:yyyy-MM-dd}", x.DateCreate) : "",
            }).FirstOrDefaultAsync();

            // Notify sender about the successful job assignment
            if (notification != null && _connections.TryGetValue(notification.SenderId.ToString(), out var senderConnectionId))
            {
                var res = new NotificationResponse()
                {
                    Message = notification.SenderMessage,
                    Data = notification,
                };

                await Clients.Client(senderConnectionId).SendAsync("JobAssigned", res);
            }

            if(notification != null && notification.RelatedId != null && _connections.TryGetValue(string.Format("{0}", notification.RelatedId), out var senderObjConnectionId))
            {
                var res = new NotificationResponse()
                {
                    Message = notification.RelatedMessage,
                    Data = notification,
                };

                await Clients.Client(senderObjConnectionId).SendAsync("JobAssigned", res);
            }

            // Notify receiver about the new job assignment
            if (notification != null && _connections.TryGetValue(notification.ReceiverId.ToString(), out var receiverConnectionId))
            {
                var res = new NotificationResponse()
                {
                    Message = notification.ReceiverMessage,
                    Data = notification,
                };

                await Clients.Client(receiverConnectionId).SendAsync("JobAssigned", res);
            }
        }
    }
}
