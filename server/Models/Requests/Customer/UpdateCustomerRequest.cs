namespace VslCrmApiRealTime.Models.Requests.Customer
{
    public class UpdateCustomerRequest
    {
        public long Id { get; set; }
        public long? IDCountry { get; set; }
        public long? IDCity { get; set; }
        public long? IDTypeOfBusiness { get; set; }
        public string? Code { get; set; }
        public string? NameVI { get; set; }
        public string? NameEN { get; set; }
        public string? AddressVI { get; set; }
        public string? AddressEN { get; set; }
        public string? TaxCode { get; set; }
        public string? Phone { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string? Note { get; set; }
    }
}
