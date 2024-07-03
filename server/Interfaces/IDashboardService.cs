namespace VslCrmApiRealTime.Interfaces
{
    public interface IDashboardService
    {
        Task<object> GetData();
        Task<object> GetEmployeeData(long idOffices);
    }
}
