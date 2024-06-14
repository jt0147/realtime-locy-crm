namespace VslCrmApiRealTime.Models.Requests.Notification
{
    public class AssignRequest
    {
        public required string SenderName { get; set; }
        public required string ReceiverName { get; set; }
        public int NumberJob { get; set; }
        public required string Time { get; set; }
    }
}
