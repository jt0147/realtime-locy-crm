﻿namespace VslCrmApiRealTime.Models.Requests.Category
{
    public class CreateCityRequest
    {
        public required string Code { get; set; }
        public required long IdQuocGia { get; set; }
        public required string NameVI { get; set; }
        public string? NameEN { get; set; }
    }
}
