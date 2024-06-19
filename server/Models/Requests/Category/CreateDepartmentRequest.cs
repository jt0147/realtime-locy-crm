namespace VslCrmApiRealTime.Models.Requests.Category
{
    public class CreateDepartmentRequest
    {
        public required string NameVI { get; set; }
        public string? NameEN { get; set; }
        public required long IdVanPhong { get; set; }
    }
}
