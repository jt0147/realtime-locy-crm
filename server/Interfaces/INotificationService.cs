using VslCrmApiRealTime.Data;

namespace VslCrmApiRealTime.Interfaces
{
    public interface INotificationService
    {
        Task<TblNotification?> Create(long IdTypeNotification, long IDSender, long? IDReceiver);
    }
}
