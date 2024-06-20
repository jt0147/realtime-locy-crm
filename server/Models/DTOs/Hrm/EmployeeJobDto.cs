namespace VslCrmApiRealTime.Models.DTOs.Hrm
{
    public class EmployeeJobDto
    {
        public long ID { get; set; }
        public long? IDEmployee { get; set; }
        public string Username { get; set; } = "";
        public string FullNameVI { get; set; } = ""; // Họ tên tiếng việt
        public string FullNameEN { get; set; } = ""; // Họ tên tiếng anh
    }
}
