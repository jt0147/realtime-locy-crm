using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Models.Requests.Customer;

namespace VslCrmApiRealTime.Interfaces
{
    public interface ICustomerJobService
    {
        Task<List<TblDmcustomer>?> GetCustomersByIdArray(long[] ids, long? IdNhanVien = null);
        Task ChooseCustomers(List<TblDmcustomer> data, ChooseCustomerRequest req);
        Task DeliveryCustomers(List<TblDmcustomer> data, DeliveryCustomerRequest req);
        Task UndeliveryCustomers(List<TblDmcustomer> data, UndeliveryCustomerRequest req);
        Task AcceptCustomers(List<TblDmcustomer> data, AcceptCustomerRequest req);
        Task DenyCustomers(List<TblDmcustomer> data, DenyCustomerRequest req);
    }
}
