using Microsoft.EntityFrameworkCore;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.DTOs;
using VslCrmApiRealTime.Models.DTOs.Report;
using VslCrmApiRealTime.Models.Queries;

namespace VslCrmApiRealTime.Services
{
    public class ReportService : IReportService
    {
        private readonly VslCrmContext _db;

        public ReportService(VslCrmContext db)
        {
            _db = db;
        }

        private async Task<QueryDto<ReportWorkDto>> Query(ReportWorkQuery query, string role, long idUser, List<long> idEmployees)
        {
            var q = _db.TblCustomerTacNghieps.AsQueryable().AsNoTracking();

            q = q.Where(x => (x.ThoiGianThucHien != null && x.ThoiGianThucHien >= DateTime.Parse(query.StartDate) && x.ThoiGianThucHien <= DateTime.Parse(query.EndDate)) ||
            (x.ThoiGianThucHien == null && x.DateCreate != null && x.DateCreate >= DateTime.Parse(query.StartDate) && x.DateCreate <= DateTime.Parse(query.EndDate)));

            List<ReportWorkDto>? data = new List<ReportWorkDto>();
            var total = 0;

            if (role == "admin")
            {
                total = await q.CountAsync();
                data = await q.Select(x => new ReportWorkDto()
                {
                    Id = x.Id,
                    CreatedAt = x.IduserCreateNavigation != null && x.IduserCreateNavigation.IdnhanVienNavigation != null ? (x.IduserCreateNavigation.IdnhanVienNavigation.HoTenVI ?? "") : "admin",
                    Employee = x.IddmcustomerNavigation != null && x.IddmcustomerNavigation.IdnhanVienSaleNavigation != null ? x.IddmcustomerNavigation.IdnhanVienSaleNavigation.HoTenVI : "",
                    Customer = x.IddmcustomerNavigation != null ? x.IddmcustomerNavigation.NameVI ?? "" : "",
                    TypeOfOperational = x.IdloaiTacNghiepNavigation != null ? x.IdloaiTacNghiepNavigation.Name ?? "" : "",
                    Contact = x.IdnguoiLienHeNavigation != null ? x.IdnguoiLienHeNavigation.NameVI ?? "" : "",
                    ContactContent = x.NoiDung ?? "",
                    TimeWork = x.ThoiGianThucHien != null ? string.Format("{0:yyyy-MM-dd}", x.ThoiGianThucHien) : "",
                    ResponseContent = x.KhachHangPhanHoi ?? "",
                    ResponseAt = x.NgayPhanHoi != null ? string.Format("{0:yyyy-MM-dd}", x.NgayPhanHoi) : ""
                }).ToListAsync();
            }

            if (role == "manager")
            {
                var resultFilter = await q.Include(x => x.IddmcustomerNavigation).Include(x => x.IduserCreateNavigation).ThenInclude(x => x.IdnhanVienNavigation)
                                          .Include(x => x.IdnguoiLienHeNavigation).Include(x => x.IdloaiTacNghiepNavigation).ToListAsync();
                total = resultFilter.Where(x => (x.IddmcustomerNavigation != null && x.IddmcustomerNavigation.IdnhanVienSale != null && idEmployees.Contains(x.IddmcustomerNavigation.IdnhanVienSale.Value)) || x.IduserCreate == idUser).Count();
                data = resultFilter.Where(x => (x.IddmcustomerNavigation != null && x.IddmcustomerNavigation.IdnhanVienSale != null && idEmployees.Contains(x.IddmcustomerNavigation.IdnhanVienSale.Value)) || x.IduserCreate == idUser).Select(x => new ReportWorkDto()
                {
                    Id = x.Id,
                    CreatedAt = x.IduserCreateNavigation != null && x.IduserCreateNavigation.IdnhanVienNavigation != null ? (x.IduserCreateNavigation.IdnhanVienNavigation.HoTenVI ?? "") : "admin",
                    Employee = x.IddmcustomerNavigation != null && x.IddmcustomerNavigation.IdnhanVienSaleNavigation != null ? x.IddmcustomerNavigation.IdnhanVienSaleNavigation.HoTenVI : "",
                    Customer = x.IddmcustomerNavigation != null ? x.IddmcustomerNavigation.NameVI ?? "" : "",
                    TypeOfOperational = x.IdloaiTacNghiepNavigation != null ? x.IdloaiTacNghiepNavigation.Name ?? "" : "",
                    Contact = x.IdnguoiLienHeNavigation != null ? x.IdnguoiLienHeNavigation.NameVI ?? "" : "",
                    ContactContent = x.NoiDung ?? "",
                    TimeWork = x.ThoiGianThucHien != null ? string.Format("{0:yyyy-MM-dd}", x.ThoiGianThucHien) : "",
                    ResponseContent = x.KhachHangPhanHoi ?? "",
                    ResponseAt = x.NgayPhanHoi != null ? string.Format("{0:yyyy-MM-dd}", x.NgayPhanHoi) : ""
                }).ToList();
            }

            if (role == "employee")
            {
                total = await q.Where(x => x.IduserCreate == idUser).CountAsync();
                data = await q.Where(x => x.IduserCreate == idUser).Select(x => new ReportWorkDto()
                {
                    Id = x.Id,
                    CreatedAt = x.IduserCreateNavigation != null && x.IduserCreateNavigation.IdnhanVienNavigation != null ? (x.IduserCreateNavigation.IdnhanVienNavigation.HoTenVI ?? "") : "admin",
                    Employee = x.IddmcustomerNavigation != null && x.IddmcustomerNavigation.IdnhanVienSaleNavigation != null ? x.IddmcustomerNavigation.IdnhanVienSaleNavigation.HoTenVI : "",
                    Customer = x.IddmcustomerNavigation != null ? x.IddmcustomerNavigation.NameVI ?? "" : "",
                    TypeOfOperational = x.IdloaiTacNghiepNavigation != null ? x.IdloaiTacNghiepNavigation.Name ?? "" : "",
                    Contact = x.IdnguoiLienHeNavigation != null ? x.IdnguoiLienHeNavigation.NameVI ?? "" : "",
                    ContactContent = x.NoiDung ?? "",
                    TimeWork = x.ThoiGianThucHien != null ? string.Format("{0:yyyy-MM-dd}", x.ThoiGianThucHien) : "",
                    ResponseContent = x.KhachHangPhanHoi ?? "",
                    ResponseAt = x.NgayPhanHoi != null ? string.Format("{0:yyyy-MM-dd}", x.NgayPhanHoi) : ""
                }).ToListAsync();
            }

            var result = new QueryDto<ReportWorkDto>()
            {
                Data = data,
                TotalRow = total,
            };

            return result;
        }

        public async Task<QueryDto<ReportWorkDto>> GetReportWork(ReportWorkQuery query, string permission, long idUser, List<long> idEmployees)
        {
            string role;
            if (permission.Contains("1048576") || permission.Contains("7000"))
            {
                role = "admin";
            }
            else if (permission.Contains("7080"))
            {
                role = "manager";
            }
            else
            {
                role = "employee";
            }
            var data = await Query(query, role, idUser, idEmployees);
            return data;
        }
    }
}
