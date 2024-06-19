namespace VslCrmApiRealTime.Models.DTOs
{
    public class QueryDto<T>
    {
        public List<T>? Data { get; set; }
        public int TotalRow { get; set; }
    }
}
