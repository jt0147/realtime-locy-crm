using Microsoft.EntityFrameworkCore;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.DTOs.Sys;
using VslCrmApiRealTime.Models.Requests.Sys;

namespace VslCrmApiRealTime.Services
{
    public class SysOptionService : ISysOptionService
    {
        private readonly VslCrmContext _db;

        public SysOptionService(VslCrmContext db)
        {
            _db = db;
        }

        public async Task<SysOptionDto?> GetData()
        {
            var data = await _db.TblSysOptions.Select(x => new SysOptionDto()
            {
                NumberOfManagedCustomers = x.SoLuongKh ?? 0,
                DayForReceiveCustomer = x.NgayNhanKhach ?? 0,
            }).FirstOrDefaultAsync();
            return data;
        }

        public async Task Update(UpdateSysOptionRequest req)
        {
            var data = await _db.TblSysOptions.FirstOrDefaultAsync();

            if (data != null)
            {
                data.SoLuongKh = req.NumberOfManagedCustomers;
                data.NgayNhanKhach = req.DayForReceiveCustomer;
                await _db.SaveChangesAsync();
            }
        }
    }
}
