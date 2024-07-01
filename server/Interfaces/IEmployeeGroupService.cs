using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Models.DTOs.Hrm;
using VslCrmApiRealTime.Models.Requests.Hrm;

namespace VslCrmApiRealTime.Interfaces
{
    public interface IEmployeeGroupService
    {
        Task<List<EmployeeJobDto>?> GetEmployeeNoGroup();
        Task<List<EmployeeGroupDto>?> GetEmployeeGroups();
        Task<int> GetTotalEmployeeGroups();
        Task CreateGroup(CreateEmployeeGroupRequest req);
        Task DeleteGroup(TblNhanSuTreelist data);
        Task<TblNhanSuTreelist?> GetEmployeeGroupById(long id);
    }
}
