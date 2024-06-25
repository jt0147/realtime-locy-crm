namespace VslCrmApiRealTime.Models.DTOs.Notification
{
    public class NotificationDto
    {
        public long Id { get; set; }
        public long SenderId { get; set; }
        public long ReceiverId { get; set; }
        public long? RelatedId { get; set; }
        public bool? IsRead { get; set; }
        public string CreatedAt { get; set; } = "";
        public long IdMess { get; set; }
        public string SenderMessage { get; set; } = "";
        public string ReceiverMessage { get; set; } = "";
        public string RelatedMessage { get; set; } = "";
    }
}
