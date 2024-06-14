namespace VslCrmApiRealTime.Models.Requests.Sys
{
    public class UpdateSysOptionRequest
    {
        public required int NumberOfManagedCustomers { get; set; }
        public required int DayForReceiveCustomer { get; set; }
    }
}
