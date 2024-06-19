using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Models.DTOs;
using VslCrmApiRealTime.Models.DTOs.Customer;
using VslCrmApiRealTime.Models.Queries;
using VslCrmApiRealTime.Models.Requests.Customer;

namespace VslCrmApiRealTime.Interfaces
{
    public interface ICustomerService
    {
        // Manage data
        Task<QueryDto<CustomerDto>> GetData(CustomerQuery query, string permission, long idUser, long idEmployee, List<long> idEmployees);
        Task<TblDmcustomer?> GetById(long id);
        Task Create(CreateCustomerRequest req);
        Task Update(TblDmcustomer data, UpdateCustomerRequest req);
        Task Delete(TblDmcustomer data, DeleteCustomerRequest req);
        Task Remove(TblDmcustomer data);
        Task<bool> IsExistCodeCustomer(string code);
        Task<bool> IsExistTaxCodeCustomer(string code);

        // List export
        Task<List<TblDmcustomer>?> GetCustomersData(int pageNumber, int pageSize, string permission, long idUser, long idEmployee, List<long> idEmployees);
        Task<List<TblDmcustomer>?> GetCustomersReceivedData(int pageNumber, int pageSize, string permission, long idUser, long idEmployee, List<long> idEmployees);
    }
}
