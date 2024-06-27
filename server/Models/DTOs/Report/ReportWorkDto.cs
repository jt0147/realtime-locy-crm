namespace VslCrmApiRealTime.Models.DTOs.Report
{
    public class ReportWorkDto
    {
        public long Id { get; set; }
        public string? CreatedAt { get; set; } // Người tạo
        public string? Employee { get; set; } // Nhân viên quản lý
        public string? Customer { get; set; } // Khách hàng
        public string? TypeOfOperational { get; set; } // Loại tác nghiệp
        public string? Contact { get; set; } // Người liên hệ
        public string? ContactContent { get; set; } // Nội dung
        public string? TimeWork { get; set; } // Thời gian thực hiện
        public string? ResponseContent { get; set; } // Khách hàng phản hồi
        public string? ResponseAt { get; set; } // Thời gian phản hồi
    }
}
