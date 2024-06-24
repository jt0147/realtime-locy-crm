namespace VslCrmApiRealTime.Models.DTOs.Information
{
    public class CustomerClassifyDto
    {
        public long Id { get; set; }
        public long? IdCustomer { get; set; }
        public long? IdPhanLoaiKhachHang { get; set; }
        public string? PhanLoaiKhachHang { get; set; }
    }
}
