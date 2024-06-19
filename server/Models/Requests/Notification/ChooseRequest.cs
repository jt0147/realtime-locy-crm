namespace VslCrmApiRealTime.Models.Requests.Notification
{
    public class ChooseRequest
    {
        public required string SenderName { get; set; }
        public required string SenderFullName { get; set; }
        public required string ReceiverName { get; set; }
        public int NumberJob { get; set; }
        public required long IDSender { get; set; }
        public required long IDReceiver { get; set; }
        public DateTime? Time { get; set; }
    }
}
