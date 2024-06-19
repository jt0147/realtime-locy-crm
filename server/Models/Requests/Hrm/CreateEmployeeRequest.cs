namespace VslCrmApiRealTime.Models.Requests.Hrm
{
    public class CreateEmployeeRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Permission { get; set; }
        public long? IDPosition { get; set; }
        public long? IDDepartment { get; set; }
        public long? IDOffice { get; set; }
        public required string EmployeeCode { get; set; }
        public required string FullNameVI { get; set; }
        public string? FullNameEN { get; set; }
        public string? BirthDay { get; set; }
        public int? Gender { get; set; }
        public string? HomeTown { get; set; }
        public string? Address { get; set; }
        public string? IDNumber { get; set; }
        public string? PlaceForIDCard { get; set; }
        public string? DayForIDCard { get; set; }
        public string? PhotoURL { get; set; }
        public string? Note { get; set; }
        public int? NumberOfManagedCustomers { get; set; }
    }
}
