namespace VslCrmApiRealTime.Models.Requests.Auth
{
    public class CheckOTPRequest
    {
        public required string Email { get; set; }
        public required string Otp { get; set; }
    }
}
