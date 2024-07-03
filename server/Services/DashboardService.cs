using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.DTOs.Information;
using VslCrmApiRealTime.Models.DTOs.Notification;

namespace VslCrmApiRealTime.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly VslCrmContext _db;

        public DashboardService(VslCrmContext db)
        {
            _db = db;
        }

        public async Task<object> GetData()
        {
            var totalEmployee = await _db.TblNhanSus.CountAsync();
            var totalCustomer = await _db.TblDmcustomers.CountAsync();
            var mostRecentActivities = await _db.TblNotifyWebs.OrderByDescending(x => x.DateCreate).Select(x => new NotificationDto()
            {
                Id = x.Id,
                SenderId = x.IduserGui,
                ReceiverId = x.IduserNhan,
                RelatedId = x.IduserLienQuan,
                SenderMessage = x.IddmmessNavigation.MessageSender ?? "",
                ReceiverMessage = x.IddmmessNavigation.MessageReceiver ?? "",
                RelatedMessage = x.IddmmessNavigation.MessageRelated ?? "",
                IdMess = x.Iddmmess,
                IsRead = x.IsRead,
                CreatedAt = x.DateCreate != null ? string.Format("{0:yyyy-MM-dd}", x.DateCreate) : "",
            }).Skip(0).Take(5).ToListAsync();
            var operationalHistory = await _db.TblCustomerTacNghieps.OrderByDescending(x => x.DateCreate).Select(x => new CustomerOperationalDto()
            {
                Id = x.Id,
                IdLoaiTacNghiep = x.IdloaiTacNghiep,
                NoiDung = x.NoiDung ?? "",
                DateCreate = x.DateCreate != null ? string.Format("{0:yyyy-MM-dd}", x.DateCreate) : "",
                IdUserCreate = x.IduserCreate,
                IdCustomer = x.Iddmcustomer,
                IdNguoiLienHe = x.IdnguoiLienHe,
                KhachHangPhanHoi = x.KhachHangPhanHoi,
                ThoiGianThucHien = x.ThoiGianThucHien != null ? string.Format("{0:yyyy-MM-dd}", x.ThoiGianThucHien) : "",
                NgayPhanHoi = x.NgayPhanHoi != null ? string.Format("{0:yyyy-MM-dd}", x.NgayPhanHoi) : "",
                LoaiTacNghiep = _db.TblDmloaiTacNghieps.Where(y => y.Id == x.IdloaiTacNghiep).Select(y => y.Name).FirstOrDefault() ?? "",
                NguoiLienHe = _db.TblDmcontactLists.Where(y => y.Id == x.IdnguoiLienHe).Select(y => y.NameVI).FirstOrDefault() ?? "",
                NguoiTao = x.IduserCreate == 1 ? "admin" : _db.TblSysUsers.Where(y => y.Id == x.IduserCreate).Join(_db.TblNhanSus, z => z.IdnhanVien, y => y.Id, (z, y) => new { HoTen = y.HoTenVI ?? "" }).Select(y => y.HoTen).FirstOrDefault() ?? "",
            }).Skip(0).Take(5).ToListAsync();

            var data = new
            {
                TotalEmployee = totalEmployee,
                TotalCustomer = totalCustomer,
                MostRecentActivities = mostRecentActivities,
                OperationalHistory = operationalHistory,
            };

            return data;
        }

        public async Task<object> GetEmployeeData(long idOffices)
        {
            var data = await _db.TblNhanSus.Where(x => x.IdvanPhong == idOffices).GroupBy(x => x.IdphongBan).Select(x => new
            {
                IDDepartment = x.Key,
                Department = _db.TblDmphongBans.Where(c => c.Id == x.Key).Select(x => x.NameVI).FirstOrDefault(),
                TotalEmployee = x.Count()
            }).ToListAsync();

            return data;
        }
    }
}
