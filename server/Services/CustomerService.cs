using Microsoft.EntityFrameworkCore;
using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Interfaces;
using VslCrmApiRealTime.Models.DTOs;
using VslCrmApiRealTime.Models.DTOs.Customer;
using VslCrmApiRealTime.Models.Queries;
using VslCrmApiRealTime.Models.Requests.Customer;

namespace VslCrmApiRealTime.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly VslCrmContext _db;

        public CustomerService(VslCrmContext db)
        {
            _db = db;
        }

        private async Task<QueryDto<CustomerDto>> Query(CustomerQuery query, string role, long idUser, long idEmployee, List<long> idEmployees)
        {
            var q = _db.TblDmcustomers.AsQueryable().AsNoTracking();

            // Customer condition
            if (query.IDTypeOfBusiness != null)
            {
                q = q.Where(c => c.IdloaiDoanhNghiep == query.IDTypeOfBusiness);
            }

            if (query.IDMajor != null)
            {
                q = q.Where(c => _db.TblDmcustomerNghiepVus.Any(x => x.Iddmcustomer == c.Id && x.IddmnghiepVu == query.IDMajor));
            }

            if (query.IDClassifyCustomer != null)
            {
                q = q.Where(c => _db.TblDmcustomerPhanLoaiKhs.Any(x => x.Iddmcustomer == c.Id && x.IddmphanLoaiKhachHang == query.IDClassifyCustomer));
            }

            if (query.IDEvaluate != null)
            {
                q = q.Where(c => _db.TblDmcustomerDanhGia.Any(x => x.Iddmcustomer == c.Id && x.IddmcustomerType == query.IDEvaluate));
            }

            if (query.IDTypeOfOperational != null)
            {
                q = q.Where(c => _db.TblCustomerTacNghieps.Any(x => x.Iddmcustomer == c.Id && x.IdloaiTacNghiep == query.IDTypeOfOperational));
            }

            if (!string.IsNullOrEmpty(query.Name))
            {
                var text = query.Name.ToLower().Trim();
                q = q.Where(c => c.NameVI != null && c.NameVI.ToLower().Contains(text));
            }

            if (!string.IsNullOrEmpty(query.TaxCode))
            {
                var text = query.TaxCode.ToLower().Trim();
                q = q.Where(c => c.TaxCode != null && c.TaxCode.ToLower().Contains(text));
            }

            // Route condition
            if (query.IDFromCountryRoute != null)
            {
                q = q.Where(c => _db.TblDmcustomerTuyenHangs.Any(x => x.Iddmcustomer == c.Id && x.IdquocGiaDi == query.IDFromCountryRoute));
            }

            if (query.IDToCountryRoute != null)
            {
                q = q.Where(c => _db.TblDmcustomerTuyenHangs.Any(x => x.Iddmcustomer == c.Id && x.IdquocGiaDen == query.IDToCountryRoute));
            }

            if (query.IDFromPortRoute != null)
            {
                q = q.Where(c => _db.TblDmcustomerTuyenHangs.Any(x => x.Iddmcustomer == c.Id && x.IdcangDi == query.IDFromPortRoute));
            }

            if (query.IDToPortRoute != null)
            {
                q = q.Where(c => _db.TblDmcustomerTuyenHangs.Any(x => x.Iddmcustomer == c.Id && x.IdcangDen == query.IDToPortRoute));
            }

            // ImEx condition
            if (query.IDFromCountryImEx != null)
            {
                q = q.Where(c => _db.TblCustomerListImExes.Any(x => x.Iddmcustomer == c.Id && x.IdfromCountry == query.IDFromCountryImEx));
            }

            if (query.IDToCountryImEx != null)
            {
                q = q.Where(c => _db.TblCustomerListImExes.Any(x => x.Iddmcustomer == c.Id && x.IdtoCountry == query.IDToCountryImEx));
            }

            if (query.IDFromPortImEx != null)
            {
                q = q.Where(c => _db.TblCustomerListImExes.Any(x => x.Iddmcustomer == c.Id && x.IdfromPort == query.IDFromPortImEx));
            }

            if (query.IDToPortImEx != null)
            {
                q = q.Where(c => _db.TblCustomerListImExes.Any(x => x.Iddmcustomer == c.Id && x.IdtoPort == query.IDToPortImEx));
            }

            if (!string.IsNullOrEmpty(query.Term))
            {
                var text = query.Term.ToLower().Trim();
                q = q.Where(c => _db.TblCustomerListImExes.Any(x => x.Iddmcustomer == c.Id && x.Term != null &&
                                         x.Term.ToLower().Contains(text)));
            }

            if (!string.IsNullOrEmpty(query.HSCode))
            {
                var text = query.HSCode.ToLower().Trim();
                q = q.Where(c => _db.TblCustomerListImExes.Any(x => x.Iddmcustomer == c.Id && x.Code != null &&
                                         x.Code.ToLower().Contains(text)));
            }

            if (!string.IsNullOrEmpty(query.Type))
            {
                var text = query.Type.ToLower().Trim();
                q = q.Where(c => _db.TblCustomerListImExes.Any(x => x.Iddmcustomer == c.Id && x.Type != null &&
                                         x.Type.ToLower().Contains(text)));
            }

            // List type condition
            if (query.ListType == "delete")
            {
                q = q.Where(c => c.FlagDel == true);
            }
            else
            {
                q = q.Where(c => c.FlagDel != true);
            }

            if (query.ListType == "all")
            {
                q = ApplyAllCondition(q, role, idEmployee);
            }

            if (query.ListType == "assigned")
            {
                q = ApplyAssignedCondition(q, role, idUser, idEmployee);
            }

            if (query.ListType == "delivered")
            {
                q = ApplyDeliveredCondition(q, idEmployee);
            }

            if (query.ListType == "received")
            {
                q = ApplyReceivedCondition(q, role, idUser, idEmployee);
            }

            if (query.ListType == "undelivered")
            {
                q = ApplyUndeliveredCondition(q);
            }

            List<CustomerDto>? data = new List<CustomerDto>();
            var total = 0;

            if (!idEmployees.Any())
            {
                total = await q.CountAsync();
                data = await q.Select(c => new CustomerDto()
                {
                    Id = c.Id,
                    IDCountry = c.IdquocGia,
                    Country = (c.IdquocGiaNavigation != null && c.IdquocGiaNavigation.NameVI != null) ? c.IdquocGiaNavigation.NameVI : "",
                    IDCity = c.Idcity,
                    City = (c.IdcityNavigation != null && c.IdcityNavigation.NameVI != null) ? c.IdcityNavigation.NameVI : "",
                    NameVI = c.NameVI ?? "",
                    NameEN = c.NameEN ?? "",
                    AddressVI = c.AddressVI ?? "",
                    AddressEN = c.AddressEN ?? "",
                    Code = c.Code ?? "",
                    TaxCode = c.TaxCode ?? "",
                    Phone = c.Phone ?? "",
                    Fax = c.Fax ?? "",
                    Email = c.Email ?? "",
                    Website = c.Website ?? "",
                    Note = c.Note ?? "",
                    IDEmployee = c.IdnhanVienSale,
                    Employee = (c.IdnhanVienSaleNavigation != null && c.IdnhanVienSaleNavigation.HoTenVI != null) ? c.IdnhanVienSaleNavigation.HoTenVI : "",
                    IDUserCreate = c.IduserCreate,
                    UserCreate = (c.IduserCreateNavigation != null && c.IduserCreateNavigation.IdnhanVienNavigation != null) ? (c.IduserCreateNavigation.IdnhanVienNavigation.HoTenVI ?? "") : "",
                    DateCreate = c.DateCreate != null ? string.Format("{0:yyyy-MM-dd}", c.DateCreate) : "",
                    FlagDel = c.FlagDel ?? false,
                    EnumDelivery = c.EnumGiaoNhan ?? 0,
                    EnumTypeCustomer = c.EnumLoaiKhachHang ?? 0,
                    IDTypeOfBusiness = c.IdloaiDoanhNghiep,
                    TypeOfBusiness = (c.IdloaiDoanhNghiepNavigation != null) ? (c.IdloaiDoanhNghiepNavigation.NameVI ?? "") : "",
                    IDUserDelete = c.IduserDelete,
                    UserDelete = (c.IduserDeleteNavigation != null && c.IduserDeleteNavigation.IdnhanVienNavigation != null) ? (c.IduserDeleteNavigation.IdnhanVienNavigation.HoTenVI ?? "") : "",
                    DateDelete = c.DateDelete != null ? string.Format("{0:yyyy-MM-dd}", c.DateDelete) : "",
                    ReasonForDelete = c.LyDoXoa ?? "",
                    InteractiveDay = c.NgayTuongTac != null ? string.Format("{0:yyyy-MM-dd}", c.NgayTuongTac) : "",
                    CustomerSelectionDay = c.NgayChonKhach != null ? string.Format("{0:yyyy-MM-dd}", c.NgayChonKhach) : "",
                    ReturnDay = c.NgayTraVe != null ? string.Format("{0:yyyy-MM-dd}", c.NgayTraVe) : "",
                    ClosingDay = c.NgayChotKhach != null ? string.Format("{0:yyyy-MM-dd}", c.NgayChotKhach) : "",
                    DayForOperational = c.NgayTacNghiep != null ? string.Format("{0:yyyy-MM-dd}", c.NgayTacNghiep) : "",
                    SnMaxOperational = c.SttmaxTacNghiep,
                    DeliveryDay = c.NgayGiao != null ? string.Format("{0:yyyy-MM-dd}", c.NgayGiao) : "",
                    ReceivedDay = c.NgayNhan != null ? string.Format("{0:yyyy-MM-dd}", c.NgayNhan) : "",
                    IDUserAssign = c.IduserGiaoViec,
                    JobAssigner = (c.IduserGiaoViecNavigation != null) ? (c.IduserGiaoViecNavigation.IdnhanVienNavigation != null ? c.IduserGiaoViecNavigation.IdnhanVienNavigation.HoTenVI : c.IduserGiaoViecNavigation.UserName) : "",
                    IDUserReturn = c.IduserTraKhach,
                    UserReturn = (c.IduserTraKhachNavigation != null && c.IduserTraKhachNavigation.IdnhanVienNavigation != null) ? (c.IduserTraKhachNavigation.IdnhanVienNavigation.HoTenVI ?? "") : "",
                    ReceiptEndDate = c.NgayKetThucNhan != null ? string.Format("{0:yyyy-MM-dd}", c.NgayKetThucNhan) : "",
                    ListOperationalText = c.ListTacNghiepText ?? "",
                    ListRouteText = c.ListTuyenHangText ?? "",
                    ListResponseText = c.ListPhanHoiText ?? "",
                    SelfCheckoutDay = c.NgayTuTraKhach != null ? string.Format("{0:yyyy-MM-dd}", c.NgayTuTraKhach) : "",
                    JobAssignmentInfo = c.ThongTinGiaoViec ?? "",
                    ReasonForDeny = c.LyDoTuChoi ?? "",
                    IDEndOperational = c.IdtacNghiepCuoi,
                    ColorEndOperational = c.MauTacNghiepCuoi ?? "",
                }).OrderByDescending(c => c.Id).Skip(query.Start).Take(query.Size).ToListAsync();
            }
            else
            {
                var resultFilter = await q.Select(c => new CustomerDto()
                {
                    Id = c.Id,
                    IDCountry = c.IdquocGia,
                    Country = (c.IdquocGiaNavigation != null && c.IdquocGiaNavigation.NameVI != null) ? c.IdquocGiaNavigation.NameVI : "",
                    IDCity = c.Idcity,
                    City = (c.IdcityNavigation != null && c.IdcityNavigation.NameVI != null) ? c.IdcityNavigation.NameVI : "",
                    NameVI = c.NameVI ?? "",
                    NameEN = c.NameEN ?? "",
                    AddressVI = c.AddressVI ?? "",
                    AddressEN = c.AddressEN ?? "",
                    Code = c.Code ?? "",
                    TaxCode = c.TaxCode ?? "",
                    Phone = c.Phone ?? "",
                    Fax = c.Fax ?? "",
                    Email = c.Email ?? "",
                    Website = c.Website ?? "",
                    Note = c.Note ?? "",
                    IDEmployee = c.IdnhanVienSale,
                    Employee = (c.IdnhanVienSaleNavigation != null && c.IdnhanVienSaleNavigation.HoTenVI != null) ? c.IdnhanVienSaleNavigation.HoTenVI : "",
                    IDUserCreate = c.IduserCreate,
                    UserCreate = (c.IduserCreateNavigation != null && c.IduserCreateNavigation.IdnhanVienNavigation != null) ? (c.IduserCreateNavigation.IdnhanVienNavigation.HoTenVI ?? "") : "",
                    DateCreate = c.DateCreate != null ? string.Format("{0:yyyy-MM-dd}", c.DateCreate) : "",
                    FlagDel = c.FlagDel ?? false,
                    EnumDelivery = c.EnumGiaoNhan ?? 0,
                    EnumTypeCustomer = c.EnumLoaiKhachHang ?? 0,
                    IDTypeOfBusiness = c.IdloaiDoanhNghiep,
                    TypeOfBusiness = (c.IdloaiDoanhNghiepNavigation != null) ? (c.IdloaiDoanhNghiepNavigation.NameVI ?? "") : "",
                    IDUserDelete = c.IduserDelete,
                    UserDelete = (c.IduserDeleteNavigation != null && c.IduserDeleteNavigation.IdnhanVienNavigation != null) ? (c.IduserDeleteNavigation.IdnhanVienNavigation.HoTenVI ?? "") : "",
                    DateDelete = c.DateDelete != null ? string.Format("{0:yyyy-MM-dd}", c.DateDelete) : "",
                    ReasonForDelete = c.LyDoXoa ?? "",
                    InteractiveDay = c.NgayTuongTac != null ? string.Format("{0:yyyy-MM-dd}", c.NgayTuongTac) : "",
                    CustomerSelectionDay = c.NgayChonKhach != null ? string.Format("{0:yyyy-MM-dd}", c.NgayChonKhach) : "",
                    ReturnDay = c.NgayTraVe != null ? string.Format("{0:yyyy-MM-dd}", c.NgayTraVe) : "",
                    ClosingDay = c.NgayChotKhach != null ? string.Format("{0:yyyy-MM-dd}", c.NgayChotKhach) : "",
                    DayForOperational = c.NgayTacNghiep != null ? string.Format("{0:yyyy-MM-dd}", c.NgayTacNghiep) : "",
                    SnMaxOperational = c.SttmaxTacNghiep,
                    DeliveryDay = c.NgayGiao != null ? string.Format("{0:yyyy-MM-dd}", c.NgayGiao) : "",
                    ReceivedDay = c.NgayNhan != null ? string.Format("{0:yyyy-MM-dd}", c.NgayNhan) : "",
                    IDUserAssign = c.IduserGiaoViec,
                    JobAssigner = (c.IduserGiaoViecNavigation != null) ? (c.IduserGiaoViecNavigation.IdnhanVienNavigation != null ? c.IduserGiaoViecNavigation.IdnhanVienNavigation.HoTenVI : c.IduserGiaoViecNavigation.UserName) : "",
                    IDUserReturn = c.IduserTraKhach,
                    UserReturn = (c.IduserTraKhachNavigation != null && c.IduserTraKhachNavigation.IdnhanVienNavigation != null) ? (c.IduserTraKhachNavigation.IdnhanVienNavigation.HoTenVI ?? "") : "",
                    ReceiptEndDate = c.NgayKetThucNhan != null ? string.Format("{0:yyyy-MM-dd}", c.NgayKetThucNhan) : "",
                    ListOperationalText = c.ListTacNghiepText ?? "",
                    ListRouteText = c.ListTuyenHangText ?? "",
                    ListResponseText = c.ListPhanHoiText ?? "",
                    SelfCheckoutDay = c.NgayTuTraKhach != null ? string.Format("{0:yyyy-MM-dd}", c.NgayTuTraKhach) : "",
                    JobAssignmentInfo = c.ThongTinGiaoViec ?? "",
                    ReasonForDeny = c.LyDoTuChoi ?? "",
                    IDEndOperational = c.IdtacNghiepCuoi,
                    ColorEndOperational = c.MauTacNghiepCuoi ?? "",
                }).ToListAsync();
                switch (query.ListType)
                {
                    case "all":
                        data = resultFilter.Where(c => c.IDEmployee == null || c.IDEmployee == idEmployee || (c.IDEmployee != null && idEmployees.Contains(c.IDEmployee.Value))).OrderByDescending(c => c.Id).Skip(query.Start).Take(query.Size).ToList();
                        total = resultFilter.Where(c => c.IDEmployee == null || c.IDEmployee == idEmployee || (c.IDEmployee != null && idEmployees.Contains(c.IDEmployee.Value))).Count();
                        break;
                    case "received":
                        data = resultFilter.Where(c => c.IDEmployee == idEmployee || (c.IDEmployee != null && c.IDUserAssign == idUser) || (c.IDEmployee != null && idEmployees.Contains(c.IDEmployee.Value))).OrderByDescending(c => c.Id).Skip(query.Start).Take(query.Size).ToList();
                        total = resultFilter.Where(c => c.IDEmployee == idEmployee || (c.IDEmployee != null && c.IDUserAssign == idUser) || (c.IDEmployee != null && idEmployees.Contains(c.IDEmployee.Value))).Count();
                        break;
                }
            }

            var result = new QueryDto<CustomerDto>()
            {
                Data = data,
                TotalRow = total,
            };

            return result;
        }

        // Helper methods to apply additional conditions based on listType and role
        private IQueryable<TblDmcustomer> ApplyAllCondition(IQueryable<TblDmcustomer> query, string role, long idEmployee)
        {
            if (role == "employee")
            {
                query = query.Where(c => c.IdnhanVienSale == null || c.IdnhanVienSale == idEmployee);
            }
            return query;
        }

        private IQueryable<TblDmcustomer> ApplyAssignedCondition(IQueryable<TblDmcustomer> query, string role, long idUser, long idEmployee)
        {
            if (role == "admin")
            {
                query = query.Where(c => c.IdnhanVienSale != null && c.EnumGiaoNhan == 1);
            }
            else if (role == "manager")
            {
                query = query.Where(c => c.IdnhanVienSale != null && c.IduserGiaoViec == idUser && c.EnumGiaoNhan == 1);
            }
            return query;
        }

        private IQueryable<TblDmcustomer> ApplyDeliveredCondition(IQueryable<TblDmcustomer> query, long idEmployee)
        {
            query = query.Where(c => c.IdnhanVienSale == idEmployee && c.EnumGiaoNhan == 1);
            return query;
        }

        private IQueryable<TblDmcustomer> ApplyReceivedCondition(IQueryable<TblDmcustomer> query, string role, long idUser, long idEmployee)
        {
            if (role == "admin")
            {
                query = query.Where(c => c.IdnhanVienSale != null && c.EnumGiaoNhan == 2);
            }
            else if (role == "manager")
            {
                query = query.Where(c => c.EnumGiaoNhan == 2);
            }
            else if (role == "employee")
            {
                query = query.Where(c => c.IdnhanVienSale == idEmployee && c.EnumGiaoNhan == 2);
            }
            return query;
        }

        private IQueryable<TblDmcustomer> ApplyUndeliveredCondition(IQueryable<TblDmcustomer> query)
        {
            query = query.Where(c => c.EnumGiaoNhan == null || c.EnumGiaoNhan == 0 || c.EnumGiaoNhan == 3);
            return query;
        }

        public async Task Create(CreateCustomerRequest req)
        {
            var data = new TblDmcustomer()
            {
                IdloaiDoanhNghiep = req.IDTypeOfBusiness,
                IdquocGia = req.IDCountry,
                Idcity = req.IDCity,
                Code = req.Code.Trim(),
                NameVI = req.NameVI.Trim(),
                NameEN = req.NameEN?.Trim() ?? "",
                AddressVI = req.AddressVI?.Trim() ?? "",
                AddressEN = req.AddressEN?.Trim() ?? "",
                TaxCode = req.TaxCode?.Trim() ?? "",
                Phone = req.Phone?.Trim() ?? "",
                Fax = req.Fax?.Trim() ?? "",
                Email = req.Email?.Trim() ?? "",
                Website = req.Website?.Trim() ?? "",
                Note = req.Note?.Trim() ?? "",
                IduserCreate = req.IDUserCreate,
            };

            await _db.TblDmcustomers.AddAsync(data);
            await _db.SaveChangesAsync();
        }

        public async Task Delete(TblDmcustomer data, DeleteCustomerRequest req)
        {
            data.FlagActive = !req.FlagDel;
            data.FlagDel = req.FlagDel;
            data.LyDoXoa = req.ReasonForDelete?.Trim() ?? "";
            data.DateDelete = req.FlagDel ? DateTime.Now : null;

            await _db.SaveChangesAsync();
        }

        public async Task<TblDmcustomer?> GetById(long id)
        {
            var data = await _db.TblDmcustomers.Where(c => c.Id == id).FirstOrDefaultAsync();
            return data;
        }

        public async Task<QueryDto<CustomerDto>> GetData(CustomerQuery query, string permission, long idUser, long idEmployee, List<long> idEmployees)
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
            var data = await Query(query, role, idUser, idEmployee, idEmployees);
            return data;
        }

        public async Task<bool> IsExistCodeCustomer(string code)
        {
            if (code == "") return false;
            var data = await _db.TblDmcustomers.Where(x => x.Code == code).FirstOrDefaultAsync();
            if (data == null) return false;
            return true;
        }

        public async Task<bool> IsExistTaxCodeCustomer(string code)
        {
            if (code == "") return false;
            var data = await _db.TblDmcustomers.Where(x => x.TaxCode == code).FirstOrDefaultAsync();
            if (data == null) return false;
            return true;
        }

        public async Task Remove(TblDmcustomer data)
        {
            var customer = await _db.TblDmcustomers.Include(c => c.TblDmcontactLists).Include(c => c.TblCustomerListImExes)
                                                   .Include(c => c.TblCustomerTacNghieps).Include(c => c.TblDmcustomerDanhGia)
                                                   .Include(c => c.TblDmcustomerNghiepVus).Include(c => c.TblDmcustomerPhanLoaiKhs)
                                                   .Include(c => c.TblDmcustomerTuyenHangs).SingleOrDefaultAsync(c => c.Id == data.Id);

            if (customer != null)
            {
                _db.TblDmcontactLists.RemoveRange(customer.TblDmcontactLists);
                _db.TblCustomerTacNghieps.RemoveRange(customer.TblCustomerTacNghieps);
                _db.TblCustomerListImExes.RemoveRange(customer.TblCustomerListImExes);
                _db.TblDmcustomerDanhGia.RemoveRange(customer.TblDmcustomerDanhGia);
                _db.TblDmcustomerNghiepVus.RemoveRange(customer.TblDmcustomerNghiepVus);
                _db.TblDmcustomerPhanLoaiKhs.RemoveRange(customer.TblDmcustomerPhanLoaiKhs);
                _db.TblDmcustomerTuyenHangs.RemoveRange(customer.TblDmcustomerTuyenHangs);

                _db.TblDmcustomers.Remove(data);
                await _db.SaveChangesAsync();
            }
        }

        public async Task Update(TblDmcustomer data, UpdateCustomerRequest req)
        {
            data.IdloaiDoanhNghiep = req.IDTypeOfBusiness ?? data.IdloaiDoanhNghiep;
            data.IdquocGia = req.IDCountry ?? data.IdquocGia;
            data.Idcity = req.IDCity ?? data.Idcity;
            data.Code = req.Code ?? data.Code;
            data.NameVI = req.NameVI ?? data.NameVI;
            data.NameEN = req.NameEN ?? data.NameEN;
            data.AddressVI = req.AddressVI ?? data.AddressVI;
            data.AddressEN = req.AddressEN ?? data.AddressEN;
            data.TaxCode = req.TaxCode ?? data.TaxCode;
            data.Phone = req.Phone ?? data.Phone;
            data.Fax = req.Fax ?? data.Fax;
            data.Email = req.Email ?? data.Email;
            data.Website = req.Website ?? data.Website;
            data.Note = req.Note ?? data.Note;

            await _db.SaveChangesAsync();
        }

        public async Task<List<TblDmcustomer>?> GetCustomersData(int pageNumber, int pageSize, string permission, long idUser, long idEmployee, List<long> idEmployees)
        {
            List<TblDmcustomer>? data;

            if ((permission.Contains("1048576") || permission.Contains("7000")))
            {
                data = await _db.TblDmcustomers.Where(c => c.FlagDel != true).OrderBy(x => x.Id).Skip(pageNumber * pageSize).Take(pageSize).ToListAsync();
            }
            else if (permission.Contains("7080"))
            {
                var dataList = await _db.TblDmcustomers.AsNoTracking().Where(c => c.FlagDel != true).Skip(pageNumber * pageSize).Take(pageSize).ToListAsync();
                data = dataList.Where(c => c.IdnhanVienSale == idEmployee || (idEmployees != null && idEmployees.Any(x1 => x1 == c.IdnhanVienSale)) || c.IdnhanVienSale == null).ToList();
            }
            else
            {
                data = await _db.TblDmcustomers.Where(c => c.FlagDel != true).Where(c => c.IdnhanVienSale == null || c.IdnhanVienSale == idEmployee).Skip(pageNumber * pageSize).Take(pageSize).ToListAsync();
            }

            return data;
        }

        public async Task<List<TblDmcustomer>?> GetCustomersReceivedData(int pageNumber, int pageSize, string permission, long idUser, long idEmployee, List<long> idEmployees)
        {
            List<TblDmcustomer>? data;

            if ((permission.Contains("1048576") || permission.Contains("7000")))
            {
                data = await _db.TblDmcustomers.Where(c => c.FlagDel != true && c.IdnhanVienSale != null && c.EnumGiaoNhan == 2).OrderBy(x => x.Id).Skip(pageNumber * pageSize).Take(pageSize).ToListAsync();
            }
            else if (permission.Contains("7080"))
            {
                var dataList = await _db.TblDmcustomers.AsNoTracking().Where(c => c.FlagDel != true && c.IdnhanVienSale != null && c.EnumGiaoNhan == 2).Skip(pageNumber * pageSize).Take(pageSize).ToListAsync();
                data = dataList.Where(c => c.IdnhanVienSale == idEmployee || (idEmployees != null && idEmployees.Any(x1 => x1 == c.IdnhanVienSale))).ToList();
            }
            else
            {
                data = await _db.TblDmcustomers.Where(c => c.FlagDel != true && c.IdnhanVienSale == idEmployee && c.EnumGiaoNhan == 2).Skip(pageNumber * pageSize).Take(pageSize).ToListAsync();
            }

            return data;
        }
    }
}
