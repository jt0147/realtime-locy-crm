using Microsoft.EntityFrameworkCore;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.Requests.Customer;

namespace VslCrmApiRealTime.Services
{
    public class CustomerJobService : ICustomerJobService
    {
        private readonly VslCrmContext _db;

        public CustomerJobService(VslCrmContext db)
        {
            _db = db;
        }

        public async Task AcceptCustomers(List<TblDmcustomer> data, AcceptCustomerRequest req)
        {
            foreach (var item in data)
            {
                item.EnumGiaoNhan = 2;
                item.NgayNhan = DateTime.Now;
                item.NgayKetThucNhan = null;
            }

            await _db.SaveChangesAsync();
        }

        public async Task ChooseCustomers(List<TblDmcustomer> data, ChooseCustomerRequest req)
        {
            foreach (var item in data)
            {
                item.IdnhanVienSale = req.IDEmployee;
                item.EnumGiaoNhan = 2;
                item.NgayNhan = DateTime.Now;
                item.NgayKetThucNhan = null;
                item.ThongTinGiaoViec = "";
                item.IduserGiaoViec = null;
                item.IduserTraKhach = null;
                item.LyDoTuChoi = "";
            }

            await _db.SaveChangesAsync();
        }

        public async Task DeliveryCustomers(List<TblDmcustomer> data, DeliveryCustomerRequest req)
        {
            var systemOps = await _db.TblSysOptions.FirstOrDefaultAsync();

            foreach (var item in data)
            {
                item.IdnhanVienSale = req.IDEmployee;
                item.IduserGiaoViec = req.IDUserAssign;
                item.ThongTinGiaoViec = req.JobAssignmentInfo;
                item.EnumGiaoNhan = 1;
                item.NgayGiao = DateTime.Now;
                item.NgayKetThucNhan = systemOps?.NgayNhanKhach != null ? DateTime.Now.AddDays(Convert.ToDouble(systemOps.NgayNhanKhach)) : DateTime.Now.AddDays(3);
                item.NgayNhan = null;
                item.NgayTraVe = null;
                item.IduserTraKhach = null;
            }

            await _db.SaveChangesAsync();
        }

        public async Task DenyCustomers(List<TblDmcustomer> data, DenyCustomerRequest req)
        {
            foreach (var item in data)
            {
                item.IdnhanVienSale = null;
                item.EnumGiaoNhan = 3;
                item.LyDoTuChoi = req.ReasonForDeny;
                item.NgayKetThucNhan = null;
            }

            await _db.SaveChangesAsync();
        }

        public async Task<List<TblDmcustomer>?> GetCustomersByIdArray(long[] ids, long? IdNhanVien = null)
        {
            List<TblDmcustomer>? data;
            if (IdNhanVien != null)
            {
                data = await Task.FromResult(_db.TblDmcustomers.ToList().Where(x => ids.Contains(x.Id) && x.IdnhanVienSale == IdNhanVien).ToList());
            }
            else
            {
                data = await Task.FromResult(_db.TblDmcustomers.ToList().Where(x => ids.Contains(x.Id)).ToList());
            }
            return data;
        }

        public async Task UndeliveryCustomers(List<TblDmcustomer> data, UndeliveryCustomerRequest req)
        {
            foreach (var item in data)
            {
                item.IdnhanVienSale = null;
                item.IduserGiaoViec = null;
                item.ThongTinGiaoViec = "";
                item.EnumGiaoNhan = 0;
                item.NgayGiao = null;
                item.NgayNhan = null;
                item.NgayKetThucNhan = null;
                item.LyDoTuChoi = null;
            }

            await _db.SaveChangesAsync();
        }
    }
}
