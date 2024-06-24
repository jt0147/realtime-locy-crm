namespace VslCrmApiRealTime.Models.Requests.Information
{
    public class UpdateCustomerClassifyRequest
    {
        public long Id { get; set; }
        public long? IdCustomer { get; set; }
        public long? IdPhanLoaiKhachHang { get; set; }
    }
}
