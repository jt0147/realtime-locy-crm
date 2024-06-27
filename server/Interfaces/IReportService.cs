using VslCrmApiRealTime.Models.DTOs;
using VslCrmApiRealTime.Models.DTOs.Report;
using VslCrmApiRealTime.Models.Queries;

namespace VslCrmApiRealTime.Interfaces
{
    public interface IReportService
    {
        Task<QueryDto<ReportWorkDto>> GetReportWork(ReportWorkQuery query, string permission, long idUser, List<long> idEmployees);
    }
}
