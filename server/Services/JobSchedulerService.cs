using Microsoft.EntityFrameworkCore;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Interfaces;

namespace VslCrmApiRealTime.Services
{
    public class JobSchedulerService : IJobSchedulerService
    {
        private readonly VslCrmContext _db;

        public JobSchedulerService(VslCrmContext db)
        {
            _db = db;
        }

        public async Task CheckAndUpdateCustomerJobs()
        {
            var customers = await _db.TblDmcustomers.Where(x => x.EnumGiaoNhan == 1 && x.IdnhanVienSale != null && x.NgayKetThucNhan < DateTime.Now).ToListAsync();

            if (customers != null)
            {
                foreach (var customer in customers)
                {
                    customer.EnumGiaoNhan = 0;
                    customer.IdnhanVienSale = null;
                    customer.IduserGiaoViec = null;
                    customer.ThongTinGiaoViec = "";
                    customer.NgayGiao = null;
                    customer.NgayKetThucNhan = null;
                    customer.NgayNhan = null;
                    customer.LyDoTuChoi = null;
                    customer.LyDoXoa = null;
                }

                await _db.SaveChangesAsync();
            }
        }
    }
}
