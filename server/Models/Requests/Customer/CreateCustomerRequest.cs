namespace VslCrmApiRealTime.Models.Requests.Customer
{
    public class CreateCustomerRequest
    {
        public long? IDTypeOfBusiness { get; set; } // ID loại doanh nghiệp
        public long? IDCountry { get; set; }
        public long? IDCity { get; set; }
        public required string Code { get; set; }
        public required string NameVI { get; set; }
        public string? NameEN { get; set; }
        public string? AddressVI { get; set; }
        public string? AddressEN { get; set; }
        public string? TaxCode { get; set; }
        public string? Phone { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string? Note { get; set; }
        public required long IDUserCreate { get; set; }
    }
}
