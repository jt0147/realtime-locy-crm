namespace VslCrmApiRealTime.Models.DTOs.Hrm
{
    public class EmployeeGroupDto
    {
        public long Id { get; set; }
        public long? ParentId { get; set; }
        public string? NameGroup { get; set; }
        public long? IdNhanVien { get; set; }
        public string? NameVI { get; set; }
        public string? ChucVu { get; set; }
        public bool? FlagViewAllGroup { get; set; }
    }
}
