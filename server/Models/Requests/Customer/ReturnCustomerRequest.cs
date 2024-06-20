namespace VslCrmApiRealTime.Models.Requests.Customer
{
    public class ReturnCustomerRequest
    {
        public required long IDUser { get; set; }
        public required long[] IdCustomers { get; set; }
    }
}
