using Microsoft.EntityFrameworkCore;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Interfaces;

namespace VslCrmApiRealTime.Services
{
    public class NotificationService : INotificationService
    {
        private readonly VslCrmContext _db;

        public NotificationService(VslCrmContext db)
        {
            _db = db;
        }

        public async Task<TblNotification> Create(long IdTypeNotification, long IDSender, long? IDReceiver = null, string? objNoti = "")
        {
            var data = new TblNotification()
            {
                IdNguoiGui = IDSender,
                IdNguoiNhan = IDReceiver != null ? IDReceiver : _db.TblSysUsers.Where(x => x.UserName != null && x.UserName.ToLower() == "admin").Select(x => x.Id).FirstOrDefault(),
                IdLoaiNotification = IdTypeNotification,
                KieuDoiTuongLienQuan = "tblDMCustomer",
                Cd = DateTime.Now,
                ListDoiTuongLienQuan = !string.IsNullOrEmpty(objNoti) ? objNoti : null,
            };

            await _db.TblNotifications.AddAsync(data);
            await _db.SaveChangesAsync();

            return data;
        }
    }
}
