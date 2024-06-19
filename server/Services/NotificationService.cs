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

        public async Task<TblNotification?> Create(long IdTypeNotification, long IDSender, long? IDReceive)
        {
            var data = new TblNotification()
            {
                IdNguoiGui = IDSender,
                IdNguoiNhan = IdTypeNotification >= 7 && IdTypeNotification <= 9 ? _db.TblSysUsers.Where(x => x.UserName == "admin").Select(x => x.Id).FirstOrDefault() : IDReceive,
                IdLoaiNotification = IdTypeNotification,
                KieuDoiTuongLienQuan = "tblDMCustomer",
            };

            await _db.TblNotifications.AddAsync(data);
            await _db.SaveChangesAsync();

            return data;
        }
    }
}
