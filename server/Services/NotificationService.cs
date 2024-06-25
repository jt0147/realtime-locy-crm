using Microsoft.EntityFrameworkCore;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.Requests.Customer;

namespace VslCrmApiRealTime.Services
{
    public class NotificationService : INotificationService
    {
        private readonly VslCrmContext _db;

        public NotificationService(VslCrmContext db)
        {
            _db = db;
        }

        public async Task<long> CreateAcceptNotification(AcceptCustomerRequest req, List<TblDmcustomer> customers)
        {
            var idAdmin = await _db.TblSysUsers.Where(x => x.UserName != null && x.UserName.ToLower() == "admin").Select(x => x.Id).FirstOrDefaultAsync();
            var senderName = await _db.TblNhanSus.Where(x => x.Id == req.IDEmployee).Select(x => x.HoTenVI).FirstOrDefaultAsync();

            var totalCustomer = customers.Count(customer => customer.IduserGiaoViec != idAdmin);
            var idAssign = customers.Where(customer => customer.IduserGiaoViec != null && customer.IduserGiaoViec != idAdmin)
                                    .Select(customer => customer.IduserGiaoViec).FirstOrDefault();
            var onlyAdmin = totalCustomer == 0;

            var notificationMess = new TblNotifyWebMessage()
            {
                MessageSender = $"Bạn đã nhận {req.IDCustomers.Length} khách hàng!",
                MessageReceiver = onlyAdmin ? $"{senderName} đã nhận {req.IDCustomers.Length} khách hàng" : $"{senderName} đã nhận {totalCustomer} khách hàng",
                MessageRelated = onlyAdmin ? null : $"{senderName} đã nhận {req.IDCustomers.Length} khách hàng",
            };

            await _db.TblNotifyWebMessages.AddAsync(notificationMess);
            await _db.SaveChangesAsync();

            var notification = new TblNotifyWeb()
            {
                IduserGui = req.IDUser,
                IduserNhan = (!onlyAdmin && idAssign != null) ? idAssign.Value : idAdmin,
                IduserLienQuan = onlyAdmin ? null : idAdmin,
                IsRead = false,
                Iddmmess = notificationMess.Id,
                DateCreate = DateTime.Now,
            };

            await _db.TblNotifyWebs.AddAsync(notification);
            await _db.SaveChangesAsync();

            return notification.Id;
        }

        public async Task<long> CreateChooseNotification(ChooseCustomerRequest req)
        {
            var senderName = await _db.TblNhanSus.Where(x => x.Id == req.IDEmployee).Select(x => x.HoTenVI).FirstOrDefaultAsync();

            var notificationMess = new TblNotifyWebMessage()
            {
                MessageSender = $"Bạn đã tự nhận {req.IDCustomers.Length} khách hàng về quản lý!",
                MessageReceiver = $"{senderName} đã tự nhận {req.IDCustomers.Length} khách hàng về quản lý!",
                MessageRelated = null,
            };

            await _db.TblNotifyWebMessages.AddAsync(notificationMess);
            await _db.SaveChangesAsync();

            var notification = new TblNotifyWeb()
            {
                IduserGui = req.IDUser,
                IduserNhan = _db.TblSysUsers.Where(x => x.UserName != null && x.UserName.ToLower() == "admin").Select(x => x.Id).FirstOrDefault(),
                IduserLienQuan = null,
                IsRead = false,
                Iddmmess = notificationMess.Id,
                DateCreate = DateTime.Now,
            };

            await _db.TblNotifyWebs.AddAsync(notification);
            await _db.SaveChangesAsync();

            return notification.Id;
        }

        public async Task<long> CreateDeliveryNotification(DeliveryCustomerRequest req)
        {
            var isAdmin = await _db.TblSysUsers.Where(x => x.Id == req.IDUserAssign && x.UserName != null && x.UserName.ToLower() == "admin").FirstOrDefaultAsync();
            var senderName = await _db.TblSysUsers.Where(x => x.Id == req.IDUserAssign).Select(x => x.IdnhanVienNavigation != null ? x.IdnhanVienNavigation.HoTenVI : "admin").FirstOrDefaultAsync();
            var receiverName = await _db.TblNhanSus.Where(x => x.Id == req.IDEmployee).Select(x => x.HoTenVI).FirstOrDefaultAsync();

            var notificationMess = new TblNotifyWebMessage()
            {
                MessageSender = $"Bạn đã giao {req.IDCustomers.Length} khách hàng cho {receiverName}!",
                MessageReceiver = $"Bạn đã được giao {req.IDCustomers.Length} khách hàng bởi {senderName}!",
                MessageRelated = isAdmin != null ? null : $"{senderName} đã giao {req.IDCustomers.Length} khách hàng cho {receiverName}!",
            };

            await _db.TblNotifyWebMessages.AddAsync(notificationMess);
            await _db.SaveChangesAsync();

            var notification = new TblNotifyWeb()
            {
                IduserGui = req.IDUserAssign,
                IduserNhan = req.IDAccountEmployee,
                IduserLienQuan = isAdmin != null ? null : _db.TblSysUsers.Where(x => x.UserName != null && x.UserName.ToLower() == "admin").Select(x => x.Id).FirstOrDefault(),
                IsRead = false,
                Iddmmess = notificationMess.Id,
                DateCreate = DateTime.Now,
            };

            await _db.TblNotifyWebs.AddAsync(notification);
            await _db.SaveChangesAsync();

            return notification.Id;
        }

        public async Task<long> CreateDenyNotification(DenyCustomerRequest req)
        {
            return 1;
        }
    }
}
