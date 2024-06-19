namespace VslCrmApiRealTime.Models.Requests.Category
{
    public class UpdateDepartmentRequest
    {
        public long Id { get; set; }
        public string? NameVI { get; set; }
        public string? NameEN { get; set; }
        public long? IdVanPhong { get; set; }
    }
}
