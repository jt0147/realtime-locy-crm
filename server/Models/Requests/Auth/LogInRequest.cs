namespace VslCrmApiRealTime.Models.Requests.Auth
{
    public class LogInRequest
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
