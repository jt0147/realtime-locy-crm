using Microsoft.EntityFrameworkCore;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.DTOs.Profile;
using VslCrmApiRealTime.Models.Requests.Profile;

namespace VslCrmApiRealTime.Services
{
    public class ProfileService : IProfileService
    {
        private readonly VslCrmContext _db;

        public ProfileService(VslCrmContext db)
        {
            _db = db;
        }

        public async Task<ProfileDto?> GetProfileById(long id)
        {
            ProfileDto? data = await _db.TblSysUsers.Where(x => x.Id == id).Select(x => new ProfileDto()
            {
                Id = x.Id,
                Username = x.UserName ?? "",
                Permission = x.Permission ?? "",
                Active = x.Active ?? false,
                IDEmployee = x.IdnhanVien,
                IDPosition = x.IdnhanVienNavigation != null ? x.IdnhanVienNavigation.IdchucVu : null,
                Position = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.IdchucVuNavigation != null) ? (x.IdnhanVienNavigation.IdchucVuNavigation.NameVI ?? "") : "",
                IDDepartment = x.IdnhanVienNavigation != null ? x.IdnhanVienNavigation.IdphongBan : null,
                Department = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.IdphongBanNavigation != null) ? (x.IdnhanVienNavigation.IdphongBanNavigation.NameVI ?? "") : "",
                IDOffice = x.IdnhanVienNavigation != null ? x.IdnhanVienNavigation.IdvanPhong : null,
                Office = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.IdvanPhongNavigation != null) ? (x.IdnhanVienNavigation.IdvanPhongNavigation.NameVI ?? "") : "",
                EmployeeCode = x.IdnhanVienNavigation != null ? x.IdnhanVienNavigation.Manhansu : "",
                FullNameVI = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.HoTenVI != null) ? x.IdnhanVienNavigation.HoTenVI : "admin",
                FullNameEN = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.HoTenEN != null) ? x.IdnhanVienNavigation.HoTenEN : "admin",
                BirthDay = x.IdnhanVienNavigation != null ? string.Format("{0:yyyy-MM-dd}", x.IdnhanVienNavigation.NamSinh) : "",
                Gender = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.GioiTinh != null) ? x.IdnhanVienNavigation.GioiTinh : 3,
                HomeTown = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.QueQuan != null) ? x.IdnhanVienNavigation.QueQuan : "",
                Address = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.DiaChiHienTai != null) ? x.IdnhanVienNavigation.DiaChiHienTai : "",
                Phone = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.DiDong != null) ? x.IdnhanVienNavigation.DiDong : "",
                Email = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.Email != null) ? x.IdnhanVienNavigation.Email : "",
                IDNumber = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.SoCmt != null) ? x.IdnhanVienNavigation.SoCmt : "",
                PlaceForIDCard = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.NoiCapCmt != null) ? x.IdnhanVienNavigation.NoiCapCmt : "",
                DayForIDCard = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.NgayCapCmt != null) ? string.Format("{0:yyyy-MM-dd}", x.IdnhanVienNavigation.NgayCapCmt) : "",
                PhotoURL = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.PhotoUrl != null) ? x.IdnhanVienNavigation.PhotoUrl : "",
                Note = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.GhiChu != null) ? x.IdnhanVienNavigation.GhiChu : "",
                NumberOfManagedCustomers = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.SoLuongKh != null) ? x.IdnhanVienNavigation.SoLuongKh : 0,
                FlagDelete = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.FlagDelete != null) ? x.IdnhanVienNavigation.FlagDelete : false,
                IDUserDelete = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.IduserDelete != null) ? x.IdnhanVienNavigation.IduserDelete : null,
                DateDelete = (x.IdnhanVienNavigation != null && x.IdnhanVienNavigation.DateDelete != null) ? string.Format("{0:yyyy-MM-dd}", x.IdnhanVienNavigation.DateDelete) : "",
            }).FirstOrDefaultAsync();

            return data;
        }

        public async Task UpdateProfile(TblNhanSu data, UpdateProfileRequest req)
        {
            data.HoTenVI = req.FullNameVI?.Trim()?.Length > 0 ? req.FullNameVI : data.HoTenVI;
            data.NamSinh = req.BirthDay?.Trim()?.Length > 0 ? DateOnly.Parse(req.BirthDay) : data.NamSinh;
            data.GioiTinh = req.Gender ?? data.GioiTinh;
            data.QueQuan = req.HomeTown?.Trim()?.Length > 0 ? req.HomeTown : data.QueQuan;
            data.DiaChiHienTai = req.Address?.Trim()?.Length > 0 ? req.Address : data.DiaChiHienTai;
            data.SoCmt = req.IDNumber?.Trim()?.Length > 0 ? req.IDNumber : data.SoCmt;
            data.NoiCapCmt = req.PlaceForIDCard?.Trim()?.Length > 0 ? req.PlaceForIDCard : data.NoiCapCmt;
            data.NgayCapCmt = req.DayForIDCard?.Trim()?.Length > 0 ? DateOnly.Parse(req.DayForIDCard) : data.NgayCapCmt;
            data.DiDong = req.Phone?.Trim()?.Length > 0 ? req.Phone : data.DiDong;
            data.Email = req.Email?.Trim()?.Length > 0 ? req.Email : data.Email;
            data.PhotoUrl = req.PhotoURL?.Trim().Length > 0 ? req.PhotoURL : data.PhotoUrl;

            await _db.SaveChangesAsync();
        }
    }
}
