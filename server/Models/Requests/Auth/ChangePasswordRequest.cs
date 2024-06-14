namespace VslCrmApiRealTime.Models.Requests.Auth
{
    public class ChangePasswordRequest
    {
        public long Id { get; set; }
        public required string Password { get; set; }
        public required string NewPassword { get; set; }
    }
}
