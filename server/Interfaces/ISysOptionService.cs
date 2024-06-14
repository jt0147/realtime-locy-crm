using VslCrmApiRealTime.Models.DTOs.Sys;
using VslCrmApiRealTime.Models.Requests.Sys;

namespace VslCrmApiRealTime.Interfaces
{
    public interface ISysOptionService
    {
        Task<SysOptionDto?> GetData();
        Task Update(UpdateSysOptionRequest req);
    }
}
