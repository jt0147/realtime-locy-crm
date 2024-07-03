using Microsoft.EntityFrameworkCore;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.DTOs.Hrm;
using VslCrmApiRealTime.Models.Requests.Hrm;

namespace VslCrmApiRealTime.Services
{
    public class EmployeeGroupService : IEmployeeGroupService
    {
        private readonly VslCrmContext _db;

        public EmployeeGroupService(VslCrmContext db)
        {
            _db = db;
        }

        public async Task CreateGroup(CreateEmployeeGroupRequest req)
        {
            var parent = await _db.TblNhanSuTreelists.Where(x => x.Id == req.ParentId).FirstOrDefaultAsync();
            if(parent != null)
            {
                parent.NameGroup = req.NameGroup;
                await _db.SaveChangesAsync();
            }
            
            foreach (var item in req.IdNhanVien)
            {
                var newItem = new TblNhanSuTreelist()
                {
                    ParentId = req.ParentId ?? 0,
                    NameGroup = parent != null ? "" : req.NameGroup,
                    IdnhanVien = item,
                    FlagViewAllGroup = false,
                };

                await _db.TblNhanSuTreelists.AddAsync(newItem);
                await _db.SaveChangesAsync();
            }
        }

        public async Task DeleteGroup(TblNhanSuTreelist data)
        {
            _db.TblNhanSuTreelists.Remove(data);
            await _db.SaveChangesAsync();
        }

        public async Task<TblNhanSuTreelist?> GetEmployeeGroupById(long id)
        {
            TblNhanSuTreelist? data = await _db.TblNhanSuTreelists.Where(x => x.Id == id).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<EmployeeGroupDto>?> GetEmployeeGroups()
        {
            List<EmployeeGroupDto>? data = await _db.TblNhanSuTreelists.Select(x => new EmployeeGroupDto()
            {
                Id = x.Id,
                ParentId = x.ParentId,
                NameGroup = x.NameGroup,
                FlagViewAllGroup = x.FlagViewAllGroup ?? false,
                IdNhanVien = x.IdnhanVien,
                NameVI = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.HoTenVI != null) ? x.IdnhanVienNavigation.HoTenVI : "",
                ChucVu = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.IdchucVuNavigation != null && x.IdnhanVienNavigation.IdchucVuNavigation.NameVI != null) ? x.IdnhanVienNavigation.IdchucVuNavigation.NameVI : "",
            }).Where(x => x.ParentId == 0 || _db.TblNhanSuTreelists.Any(y => y.Id == x.ParentId)).ToListAsync();

            return data;
        }

        public async Task<List<EmployeeJobDto>?> GetEmployeeNoGroup()
        {
            List<EmployeeJobDto>? data = await _db.TblSysUsers.Where(x => x.IdnhanVien != null).Select(x => new EmployeeJobDto()
            {
                ID = x.Id,
                Username = x.UserName ?? "",
                FullNameVI = x.IdnhanVienNavigation != null ? (x.IdnhanVienNavigation.HoTenVI ?? "") : "",
                FullNameEN = x.IdnhanVienNavigation != null ? (x.IdnhanVienNavigation.HoTenEN ?? "") : "",
                IDEmployee = x.IdnhanVien,
            }).Where(x => !_db.TblNhanSuTreelists.Any(y => y.IdnhanVien == x.IDEmployee)).ToListAsync();

            return data;
        }

        public async Task<int> GetTotalEmployeeGroups()
        {
            var total = await _db.TblNhanSuTreelists.Select(x => new EmployeeGroupDto()
            {
                Id = x.Id,
                ParentId = x.ParentId,
                NameGroup = x.NameGroup,
                FlagViewAllGroup = x.FlagViewAllGroup ?? false,
                IdNhanVien = x.IdnhanVien,
                NameVI = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.HoTenVI != null) ? x.IdnhanVienNavigation.HoTenVI : "",
                ChucVu = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.IdchucVuNavigation != null && x.IdnhanVienNavigation.IdchucVuNavigation.NameVI != null) ? x.IdnhanVienNavigation.IdchucVuNavigation.NameVI : "",
            }).Where(x => x.ParentId == 0 || _db.TblNhanSuTreelists.Any(y => y.Id == x.ParentId)).CountAsync();

            return total;
        }
    }
}
