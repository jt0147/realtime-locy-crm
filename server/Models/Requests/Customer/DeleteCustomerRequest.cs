namespace VslCrmApiRealTime.Models.Requests.Customer
{
    public class DeleteCustomerRequest
    {
        public long Id { get; set; }
        public long? IDUserDelete { get; set; }
        public required bool FlagDel { get; set; }
        public string? ReasonForDelete { get; set; }
    }
}
