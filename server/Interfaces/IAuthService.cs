namespace VslCrmApiRealTime.Interfaces
{
    public interface IAuthService<TModel>
    {
        Task ChangePassword(TModel data, string newPassword);
        string CreateToken(TModel data, double expire);
        Task<TModel?> GetByEmail(string email);
        Task<TModel?> GetById(long id);
        Task<TModel?> GetByUsernameAndPassword(string username, string password);
        CookieOptions GetCookieOptions(double day, bool isSecure);
        string HashPassword(string password);
    }
}
