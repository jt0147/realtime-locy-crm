using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;
using VslCrmApiRealTime.Data;
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
            // Get username from query string of URL
            var username = Context.GetHttpContext()?.Request.Query["username"].ToString();

            if (!string.IsNullOrEmpty(username)) {
                // Store connection ID and username into dictionary
                _connections[username] = Context.ConnectionId;
            }

            // Add connection ID to group job-notification
            await Groups.AddToGroupAsync(Context.ConnectionId, "job-notification");

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            // Get username from query string of URL
            var username = Context.GetHttpContext()?.Request.Query["username"].ToString();

            if (!string.IsNullOrEmpty(username))
            {
                // Remove connection ID from dictionary
                _connections.TryRemove(username, out _);
            }

            // Remove connection ID from group job-notification
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "job-notification");
            await base.OnDisconnectedAsync(exception);
        }

        // Method to assign job
        public async Task NotifyJobAssignment(AssignRequest req)
        {
            var notification = await _db.TblNotifications.Where(x => x.Id == req.IDNotification).FirstOrDefaultAsync();

            // Notify sender about the successful job assignment
            if (_connections.TryGetValue(req.SenderName, out var senderConnectionId))
            {
                var res = new NotificationResponse()
                {
                    Message = $"Bạn đã giao {req.NumberJob} khách hàng cho {req.ReceiverName} thành công!",
                    Data = notification,
                };

                await Clients.Client(senderConnectionId).SendAsync("JobAssigned", res);
            }

            // Notify receiver about the new job assignment
            if (_connections.TryGetValue(req.ReceiverName, out var receiverConnectionId))
            {
                var res = new NotificationResponse()
                {
                    Message = $"Bạn được {req.SenderName} giao {req.NumberJob} khách hàng!",
                    Data = notification,
                };

                await Clients.Client(receiverConnectionId).SendAsync("JobAssigned", res);
            }
        }

        // Method to choose job
        public async Task NotifyChooseJob(ChooseRequest req)
        {
            var notification = await _db.TblNotifications.Where(x => x.Id == req.IDNotification).FirstOrDefaultAsync();
            
            // Notify sender about the successful job assignment
            if (_connections.TryGetValue(req.SenderName, out var senderConnectionId))
            {
                var res = new NotificationResponse()
                {
                    Message = $"Bạn đã nhận {req.NumberJob} khách hàng thành công!",
                    Data = notification,
                };

                await Clients.Client(senderConnectionId).SendAsync("JobChoosed", res);
            }

            // Notify receiver about the new job assignment
            if (_connections.TryGetValue(req.ReceiverName, out var receiverConnectionId))
            {
                var res = new NotificationResponse()
                {
                    Message = $"{req.SenderFullName} đã nhận {req.NumberJob} khách hàng!",
                    Data = notification,
                };

                await Clients.Client(receiverConnectionId).SendAsync("JobChoosed", res);
            }
        }

        // Method to return job
        public async Task NotifyReturnJob(ReturnRequest req)
        {
            var notification = await _db.TblNotifications.Where(x => x.Id == req.IDNotification).FirstOrDefaultAsync();

            // Notify sender about the successful job assignment
            if (_connections.TryGetValue(req.SenderName, out var senderConnectionId))
            {
                var res = new NotificationResponse()
                {
                    Message = $"Bạn đã trả {req.NumberJob} khách hàng về kho thành công!",
                    Data = notification,
                };

                await Clients.Client(senderConnectionId).SendAsync("JobReturned", res);
            }

            // Notify receiver about the new job assignment
            if (_connections.TryGetValue(req.ReceiverName, out var receiverConnectionId))
            {
                var res = new NotificationResponse()
                {
                    Message = $"{req.SenderFullName} đã trả {req.NumberJob} khách hàng về kho!",
                    Data = notification,
                };

                await Clients.Client(receiverConnectionId).SendAsync("JobReturned", res);
            }
        }

        // Method to deny job
        public async Task NotifyDenyJob(DenyRequest req)
        {
            var notification = await _db.TblNotifications.Where(x => x.Id == req.IDNotification).FirstOrDefaultAsync();

            // Notify sender about the successful job assignment
            if (_connections.TryGetValue(req.SenderName, out var senderConnectionId))
            {
                var res = new NotificationResponse()
                {
                    Message = $"Bạn đã từ chối nhận {req.NumberJob} khách hàng thành công!",
                    Data = notification,
                };

                await Clients.Client(senderConnectionId).SendAsync("JobDenied", res);
            }

            // Notify receiver about the new job assignment
            if (_connections.TryGetValue(req.ReceiverName, out var receiverConnectionId))
            {
                var res = new NotificationResponse()
                {
                    Message = $"{req.SenderFullName} đã từ chối nhận {req.NumberJob} khách hàng!",
                    Data = notification,
                };

                await Clients.Client(receiverConnectionId).SendAsync("JobDenied", res);
            }
        }
    }
}
