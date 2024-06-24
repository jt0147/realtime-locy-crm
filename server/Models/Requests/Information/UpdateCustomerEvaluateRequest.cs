namespace VslCrmApiRealTime.Models.Requests.Information
{
    public class UpdateCustomerEvaluateRequest
    {
        public long Id { get; set; }
        public long? IdCustomer { get; set; }
        public long? IdCustomerType { get; set; }
        public string? GhiChu { get; set; }
    }
}
