namespace VslCrmApiRealTime.Models.Requests.Customer
{
    public class DenyCustomerRequest
    {
        public required long IDEmployee { get; set; }
        public required long[] IDCustomers { get; set; }
        public string? ReasonForDeny { get; set; }
    }
}
