namespace VslCrmApiRealTime.Models.DTOs.Category
{
    public class CountryDto
    {
        public long Id { get; set; }
        public string? Code { get; set; }
        public string? NameVI { get; set; }
        public string? NameEN { get; set; }
        public string? Note { get; set; }
        public bool? FlagFavorite { get; set; }
    }
}
