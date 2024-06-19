namespace VslCrmApiRealTime.Models.DTOs.Hrm
{
    public class EmployeeJobDto
    {
        public long IDAccount { get; set; }
        public long Id { get; set; }
        public string FullNameVI { get; set; } = ""; // Họ tên tiếng việt
        public string FullNameEN { get; set; } = ""; // Họ tên tiếng anh
    }
}
