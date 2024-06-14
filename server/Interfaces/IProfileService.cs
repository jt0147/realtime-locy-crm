using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Models.DTOs.Profile;
using VslCrmApiRealTime.Models.Requests.Profile;

namespace VslCrmApiRealTime.Interfaces
{
    public interface IProfileService
    {
        Task<ProfileDto?> GetProfileById(long id);
        Task UpdateProfile(TblNhanSu data, UpdateProfileRequest req);
    }
}
