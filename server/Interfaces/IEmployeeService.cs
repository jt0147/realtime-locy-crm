using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Models.DTOs;
using VslCrmApiRealTime.Models.DTOs.Hrm;
using VslCrmApiRealTime.Models.Queries;
using VslCrmApiRealTime.Models.Requests.Hrm;

namespace VslCrmApiRealTime.Interfaces
{
    public interface IEmployeeService
    {
        // Manage data
        Task<QueryDto<EmployeeDto>> GetData(EmployeeQuery query);
        Task<TblSysUser?> GetAccountById(long id);
        Task<TblNhanSu?> GetEmployeeById(long id);
        Task Create(CreateEmployeeRequest req);
        Task Update(TblSysUser? account, TblNhanSu info, UpdateEmployeeRequest req);
        Task Delete(TblNhanSu data, DeleteEmployeeRequest req);
        Task<bool> IsPersonnelCodeExist(string manhanvien);
        Task<bool> IsUsernameExist(string username);

        // Group
        Task<List<long>> GetListEmployee(long idNhanVien);
        Task<List<EmployeeJobDto>?> GetAllEmployees();
        Task<List<EmployeeJobDto>?> GetAllEmployeesGroup(List<long> ids);
    }
}
