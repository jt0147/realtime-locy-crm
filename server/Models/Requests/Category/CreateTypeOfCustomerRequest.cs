﻿namespace VslCrmApiRealTime.Models.Requests.Category
{
    public class CreateTypeOfCustomerRequest
    {
        public required string Code { get; set; }
        public required string NameVI { get; set; }
        public string? NameEN { get; set; }
    }
}
