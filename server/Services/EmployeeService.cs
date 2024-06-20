using Microsoft.EntityFrameworkCore;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.DTOs;
using VslCrmApiRealTime.Models.DTOs.Hrm;
using VslCrmApiRealTime.Models.Queries;
using VslCrmApiRealTime.Models.Requests.Hrm;

namespace VslCrmApiRealTime.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly VslCrmContext _db;
        private readonly IAuthService<TblSysUser> _authService;

        public EmployeeService(VslCrmContext db, IAuthService<TblSysUser> authService)
        {
            _db = db;
            _authService = authService;
        }

        private async Task<QueryDto<EmployeeDto>> Query(EmployeeQuery query)
        {
            var q = _db.TblNhanSus.AsQueryable();

            // Filter
            if (!string.IsNullOrEmpty(query.FullName))
            {
                var text = query.FullName.ToLower().Trim();
                q = q.Where(x => x.HoTenVI.ToLower().Contains(text));
            }

            if (query.IDPosition != null)
            {
                q = q.Where(x => x.IdchucVu == query.IDPosition);
            }

            if (query.IDDepartment != null)
            {
                q = q.Where(x => x.IdvanPhong == query.IDDepartment);
            }

            if (query.IDOffice != null)
            {
                q = q.Where(x => x.IdphongBan == query.IDOffice);
            }

            if (query.Status)
            {
                q = q.Where(x => x.FlagDelete != true);
            }
            else
            {
                q = q.Where(x => x.FlagDelete == true);
            }

            // Get data
            var total = await q.CountAsync();
            var data = await q.Select(e => new EmployeeDto()
            {
                IDAccount = _db.TblSysUsers.Where(x => x.IdnhanVien == e.Id).Select(x => x.Id).FirstOrDefault(),
                Username = _db.TblSysUsers.Where(x => x.IdnhanVien == e.Id).Select(x => x.UserName).FirstOrDefault() ?? "",
                Active = _db.TblSysUsers.Where(x => x.IdnhanVien == e.Id).Select(x => x.Active).FirstOrDefault() ?? false,
                Permission = _db.TblSysUsers.Where(x => x.IdnhanVien == e.Id).Select(x => x.Permission).FirstOrDefault() ?? "",
                Id = e.Id,
                IDPosition = e.IdchucVu,
                Position = e.IdchucVuNavigation != null ? (e.IdchucVuNavigation.NameVI ?? "") : "",
                IDDepartment = e.IdphongBan,
                Department = e.IdphongBanNavigation != null ? (e.IdphongBanNavigation.NameVI ?? "") : "",
                IDOffice = e.IdvanPhong,
                Office = e.IdvanPhongNavigation != null ? (e.IdvanPhongNavigation.NameVI ?? "") : "",
                EmployeeCode = e.Manhansu,
                FullNameVI = e.HoTenVI ?? "",
                FullNameEN = e.HoTenEN ?? "",
                BirthDay = string.Format("{0:yyyy-MM-dd}", e.NamSinh),
                Gender = e.GioiTinh ?? 3,
                HomeTown = e.QueQuan ?? "",
                Address = e.DiaChiHienTai ?? "",
                IDNumber = e.SoCmt ?? "",
                PlaceForIDCard = e.NoiCapCmt ?? "",
                DayForIDCard = e.NgayCapCmt != null ? string.Format("{0:yyyy-MM-dd}", e.NgayCapCmt) : "",
                PhotoURL = e.PhotoUrl ?? "",
                Phone = e.DiDong ?? "",
                Email = e.Email ?? "",
                Note = e.GhiChu ?? "",
                NumberOfManagedCustomers = e.SoLuongKh ?? 0,
                FlagDelete = e.FlagDelete ?? false,
                IDUserDelete = e.IduserDelete,
                DateDelete = e.DateDelete != null ? string.Format("{0:yyyy-MM-dd}", e.DateDelete) : ""
            }).OrderByDescending(c => c.Id).Skip(query.Start).Take(query.Size).ToListAsync();


            var result = new QueryDto<EmployeeDto>()
            {
                Data = data,
                TotalRow = total,
            };

            return result;
        }

        private void GetEmployeeView(TblNhanSuTreelist c, List<TblNhanSuTreelist> ListEmployeeTreeList, List<long> listEmployee)
        {
            if (c == null) return;

            var ListEmployeeParent = ListEmployeeTreeList.Where(x => x.ParentId == c.Id).ToList();

            if (ListEmployeeParent.Count > 0) // Trưởng nhóm
            {
                foreach (var employee in ListEmployeeParent)
                {
                    if (employee.IdnhanVien != null)
                    {
                        listEmployee.Add(employee.IdnhanVien.Value);
                    }

                    var _listEmployeeParent = ListEmployeeTreeList.Where(x => x.ParentId == employee.Id).ToList();
                    if (_listEmployeeParent.Count > 0)
                    {
                        GetEmployeeView(employee, ListEmployeeTreeList, listEmployee);
                    }
                }
            }
        }

        public async Task Create(CreateEmployeeRequest req)
        {
            // Add employee data to db
            var data = new TblNhanSu()
            {
                Manhansu = req.EmployeeCode,
                HoTenVI = req.FullNameVI,
                HoTenEN = req.FullNameEN ?? "",
                IdchucVu = req.IDPosition != null ? req.IDPosition : null,
                IdphongBan = req.IDDepartment != null ? req.IDDepartment : null,
                IdvanPhong = req.IDOffice != null ? req.IDOffice : null,
                GioiTinh = req.Gender != null ? req.Gender : null,
                QueQuan = req.HomeTown ?? "",
                DiaChiHienTai = req.Address ?? "",
                SoCmt = req.IDNumber ?? "",
                NoiCapCmt = req.PlaceForIDCard ?? "",
                NgayCapCmt = string.IsNullOrEmpty(req.DayForIDCard) != true ? DateOnly.Parse(req.DayForIDCard) : null,
                PhotoUrl = req.PhotoURL ?? "",
                GhiChu = req.Note ?? "",
                FlagDelete = false,
                SoLuongKh = req.NumberOfManagedCustomers ?? _db.TblSysOptions.Select(x => x.SoLuongKh).FirstOrDefault(),
                CreateDate = DateTime.Now,
            };

            if (!string.IsNullOrEmpty(req.BirthDay))
            {
                data.NamSinh = DateOnly.Parse(req.BirthDay);
            }

            await _db.TblNhanSus.AddAsync(data);
            await _db.SaveChangesAsync();

            if (!string.IsNullOrEmpty(req.Username) && !string.IsNullOrEmpty(req.Password))
            {
                // Add user data to db with id employee
                var hashPassword = _authService.HashPassword(req.Password);

                var account = new TblSysUser()
                {
                    UserName = req.Username,
                    Password = hashPassword,
                    Permission = req.Permission,
                    Active = true,
                    IdnhanVien = data.Id,
                };

                await _db.TblSysUsers.AddAsync(account);
                await _db.SaveChangesAsync();
            }
        }

        public async Task Delete(TblNhanSu data, DeleteEmployeeRequest req)
        {
            data.FlagDelete = req.FlagDelete;
            data.IduserDelete = req.IDUserDelete;
            data.DateDelete = req.FlagDelete == true ? DateTime.Now : null;

            await _db.SaveChangesAsync();
        }

        public async Task<TblSysUser?> GetAccountById(long id)
        {
            TblSysUser? data = await _db.TblSysUsers.Where(x => x.Id == id).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<EmployeeJobDto>?> GetAllEmployees()
        {
            List<EmployeeJobDto>? data = await _db.TblSysUsers.Where(x => x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.FlagDelete != true).Select(x => new EmployeeJobDto()
            {
                ID = x.Id,
                Username = x.UserName ?? "",
                FullNameVI = x.IdnhanVienNavigation != null ? (x.IdnhanVienNavigation.HoTenVI ?? "") : "",
                FullNameEN = x.IdnhanVienNavigation != null ? (x.IdnhanVienNavigation.HoTenEN ?? "") : "",
                IDEmployee = x.IdnhanVien,
            }).ToListAsync();
            return data;
        }

        public async Task<List<EmployeeJobDto>?> GetAllEmployeesGroup(List<long> ids)
        {
            List<EmployeeJobDto>? dataList = await _db.TblSysUsers.AsNoTracking().Where(x => x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.FlagDelete != true)
                                               .Select(x => new EmployeeJobDto()
                                               {
                                                   ID = x.Id,
                                                   Username = x.UserName ?? "",
                                                   FullNameVI = x.IdnhanVienNavigation != null ? (x.IdnhanVienNavigation.HoTenVI ?? "") : "",
                                                   FullNameEN = x.IdnhanVienNavigation != null ? (x.IdnhanVienNavigation.HoTenEN ?? "") : "",
                                                   IDEmployee = x.IdnhanVien,
                                               })
                                               .ToListAsync();
            var data = dataList.Where(x => ids != null && ids.Contains(x.ID)).ToList();
            return data;
        }

        public async Task<QueryDto<EmployeeDto>> GetData(EmployeeQuery query)
        {
            var data = await Query(query);
            return data;
        }

        public async Task<TblNhanSu?> GetEmployeeById(long id)
        {
            TblNhanSu? data = await _db.TblNhanSus.Where(x => x.Id == id).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<long>> GetListEmployee(long idNhanVien)
        {
            List<long> employees = new List<long>();

            var ListEmployeeTreeList = await _db.TblNhanSuTreelists.Where(x => x.IdnhanVien != null).ToListAsync();

            if (ListEmployeeTreeList.Count > 0)
            {
                var EmployeeTreeList = ListEmployeeTreeList.FirstOrDefault(x => x.IdnhanVien == idNhanVien);

                if (EmployeeTreeList != null)
                {
                    var ListEmployeeParent = ListEmployeeTreeList.Where(x => x.ParentId == EmployeeTreeList.Id).ToList();

                    if (ListEmployeeParent.Count > 0) // Trưởng nhóm
                    {
                        GetEmployeeView(EmployeeTreeList, ListEmployeeTreeList, employees);
                    }
                }
            }

            return employees;
        }

        public async Task<bool> IsPersonnelCodeExist(string manhanvien)
        {
            var data = await _db.TblNhanSus.Where(x => x.Manhansu == manhanvien).FirstOrDefaultAsync();
            if (data == null) return false;
            return true;
        }

        public async Task<bool> IsUsernameExist(string username)
        {
            var data = await _db.TblSysUsers.Where(x => x.UserName == username).FirstOrDefaultAsync();
            if (data == null) return false;
            return true;
        }

        public async Task Update(TblSysUser? account, TblNhanSu info, UpdateEmployeeRequest req)
        {
            if (account != null)
            {
                account.UserName = req.Username != null && req.Username != "" ? req.Username : account.UserName;
                if (req.Password != "" && req.Password != null)
                {
                    var hashPassword = _authService.HashPassword(req.Password);
                    account.Password = hashPassword;
                }
                account.Permission = req.Permission ?? account.Permission;
                account.Active = req.Active ?? account.Active;
            }

            if (account == null && req.Username != null && req.Username != "" && req.Password != null && req.Password != "")
            {
                // Add user data to db with id employee
                var hashPassword = _authService.HashPassword(req.Password);

                var newAccount = new TblSysUser()
                {
                    UserName = req.Username,
                    Password = hashPassword,
                    Permission = req.Permission,
                    Active = true,
                    IdnhanVien = info.Id
                };

                await _db.TblSysUsers.AddAsync(newAccount);
                await _db.SaveChangesAsync();
            }

            info.IdchucVu = req.IDPosition;
            info.IdphongBan = req.IDDepartment;
            info.IdvanPhong = req.IDOffice;
            info.Manhansu = req.EmployeeCode ?? info.Manhansu;
            info.HoTenVI = req.FullNameVI ?? info.HoTenVI;
            info.HoTenEN = req.FullNameEN ?? info.HoTenEN;
            if (!string.IsNullOrEmpty(req.BirthDay))
            {
                info.NamSinh = DateOnly.Parse(req.BirthDay);
            }
            info.GioiTinh = req.Gender;
            info.QueQuan = req.HomeTown ?? info.QueQuan;
            info.DiaChiHienTai = req.Address ?? info.DiaChiHienTai;
            info.SoCmt = req.IDNumber ?? info.SoCmt;
            info.NoiCapCmt = req.PlaceForIDCard ?? info.NoiCapCmt;
            if (!string.IsNullOrEmpty(req.DayForIDCard))
            {
                info.NgayCapCmt = DateOnly.Parse(req.DayForIDCard);
            }
            info.PhotoUrl = req.PhotoURL ?? info.PhotoUrl;
            info.GhiChu = req.Note ?? info.GhiChu;
            info.SoLuongKh = req.NumberOfManagedCustomers ?? info.SoLuongKh;
            info.EditDate = DateTime.Now;

            await _db.SaveChangesAsync();
        }
    }
}
