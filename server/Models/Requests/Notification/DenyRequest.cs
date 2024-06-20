namespace VslCrmApiRealTime.Models.Requests.Notification
{
    public class DenyRequest
    {
        public required string SenderName { get; set; }
        public required string SenderFullName { get; set; }
        public required string ReceiverName { get; set; }
        public int NumberJob { get; set; }
        public required long IDNotification { get; set; }
    }
}
