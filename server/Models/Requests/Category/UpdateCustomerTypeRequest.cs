namespace VslCrmApiRealTime.Models.Requests.Category
{
    public class UpdateCustomerTypeRequest
    {
        public long Id { get; set; }
        public string? Code { get; set; }
        public string? NameVI { get; set; }
        public string? NameEN { get; set; }
    }
}
