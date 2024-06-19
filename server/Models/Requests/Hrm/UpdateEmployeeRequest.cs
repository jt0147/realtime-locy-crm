namespace VslCrmApiRealTime.Models.Requests.Hrm
{
    public class UpdateEmployeeRequest
    {
        public long Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Permission { get; set; }
        public bool? Active { get; set; }
        public required long IDEmployee { get; set; }
        public long? IDPosition { get; set; }
        public long? IDDepartment { get; set; }
        public long? IDOffice { get; set; }
        public string? EmployeeCode { get; set; }
        public string? FullNameVI { get; set; }
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
