namespace VslCrmApiRealTime.Models.Requests.Information
{
    public class CreateCustomerEvaluateRequest
    {
        public long? IdCustomer { get; set; }
        public long? IdCustomerType { get; set; }
        public long? IdUserCreate { get; set; }
        public string? GhiChu { get; set; }
    }
}
