namespace VslCrmApiRealTime.Models.Requests.Hrm
{
    public class DeleteEmployeeRequest
    {
        public required long IDEmployee { get; set; }
        public required bool FlagDelete { get; set; }
        public long? IDUserDelete { get; set; }
    }
}
