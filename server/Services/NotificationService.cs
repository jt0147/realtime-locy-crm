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

        public async Task<TblNotification?> Create(long IdTypeNotification, long IDSender, long? IDReceiver)
        {
            var data = new TblNotification()
            {
                IdNguoiGui = IDSender,
                IdNguoiNhan = IDReceiver == null ? _db.TblSysUsers.Where(x => x.UserName != null && x.UserName == "Admin").Select(x => x.Id).FirstOrDefault() : IDReceiver,
                IdLoaiNotification = IdTypeNotification,
                KieuDoiTuongLienQuan = "tblDMCustomer",
                Cd = DateTime.Now,
            };

            await _db.TblNotifications.AddAsync(data);
            await _db.SaveChangesAsync();

            return data;
        }
    }
}
