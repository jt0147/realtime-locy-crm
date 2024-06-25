using VslCrmApiRealTime.Data;
using VslCrmApiRealTime.Models.Requests.Customer;

namespace VslCrmApiRealTime.Interfaces
{
    public interface INotificationService
    {
        // Job
        Task<long> CreateAcceptNotification(AcceptCustomerRequest req, List<TblDmcustomer> customers);
        Task<long> CreateChooseNotification(ChooseCustomerRequest req);
        Task<long> CreateDeliveryNotification(DeliveryCustomerRequest req);
        Task<long> CreateDenyNotification(DenyCustomerRequest req);
    }
}
