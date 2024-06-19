namespace VslCrmApiRealTime.Models.DTOs.Customer
{
    public class CustomerDto
    {
        public long Id { get; set; }
        public long? IDCountry { get; set; }
        public string? Country { get; set; }
        public long? IDCity { get; set; }
        public string? City { get; set; }
        public string? Code { get; set; }
        public string? NameVI { get; set; }
        public string? NameEN { get; set; }
        public string? AddressVI { get; set; }
        public string? AddressEN { get; set; }
        public string? TaxCode { get; set; }
        public string? Phone { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string? Note { get; set; }
        public long? IDEmployee { get; set; }
        public string? Employee { get; set; }
        public long? IDUserCreate { get; set; }
        public string? UserCreate { get; set; }
        public string? DateCreate { get; set; }
        public bool? FlagDel { get; set; }
        public int? EnumTypeCustomer { get; set; } // Enum loại khách hàng
        public long? IDTypeOfBusiness { get; set; } // ID loại doanh nghiệp
        public string? TypeOfBusiness { get; set; } // Loại doanh nghiệp
        public long? IDUserDelete { get; set; }
        public string? UserDelete { get; set; }
        public string? DateDelete { get; set; }
        public string? ReasonForDelete { get; set; } // Lý do xoá
        public string? InteractiveDay { get; set; } // Ngày tương tác
        public string? CustomerSelectionDay { get; set; } // Ngày chọn khách
        public string? ReturnDay { get; set; } // Ngày trả khách
        public string? ClosingDay { get; set; } // Ngày chốt khách
        public int? SnMaxOperational { get; set; } // Stt max tác nghiệp
        public string? DayForOperational { get; set; } // Ngày tác nghiệp
        public int? EnumDelivery { get; set; } // Enum giao nhận
        public string? DeliveryDay { get; set; } // Ngày giao
        public string? ReceivedDay { get; set; } // Ngày nhận
        public long? IDUserAssign { get; set; } // Id người giao việc
        public string? JobAssigner { get; set; } // Người giao việc
        public long? IDUserReturn { get; set; } // Id người trả khách
        public string? UserReturn { get; set; } // Người trả khách
        public string? ReceiptEndDate { get; set; } // Ngày kết thúc nhận
        public string? ListOperationalText { get; set; } // danh sách tác nghiệp text
        public string? ListRouteText { get; set; } // danh sách tuyến hàng text
        public string? ListResponseText { get; set; } // danh sách phản hồi text
        public string? SelfCheckoutDay { get; set; } // Ngày tự trả khách
        public string? JobAssignmentInfo { get; set; } // Thông tin giao việc
        public string? ReasonForDeny { get; set; } // Lý do từ chối
        public long? IDEndOperational { get; set; } // Id tác nghiệp cuối
        public string? ColorEndOperational { get; set; } // Màu tác nghiệp cuối
    }
}
