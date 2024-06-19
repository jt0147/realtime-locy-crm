namespace VslCrmApiRealTime.Models.Requests.Customer
{
    public class ChooseCustomerRequest
    {
        public required long IDUser { get; set; }
        public required long IDEmployee { get; set; }
        public required long[] IDCustomers { get; set; }
    }
}
