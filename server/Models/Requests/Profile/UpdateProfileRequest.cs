namespace VslCrmApiRealTime.Models.Requests.Profile
{
    public class UpdateProfileRequest
    {
        public long ID { get; set; }
        public string? FullNameVI { get; set; }
        public string? BirthDay { get; set; }
        public int? Gender { get; set; }
        public string? HomeTown { get; set; }
        public string? Address { get; set; }
        public string? IDNumber { get; set; }
        public string? PlaceForIDCard { get; set; }
        public string? DayForIDCard { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? PhotoURL { get; set; }
    }
}
