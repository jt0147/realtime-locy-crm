namespace VslCrmApiRealTime.Models.Queries
{
    public class CustomerQuery
    {
        // Pagination
        public int Start { get; set; }
        public int Size { get; set; }

        // Customer info
        public long? IDTypeOfBusiness { get; set; } // Id loại doanh nghiệp
        public long? IDMajor { get; set; } // Id nghiệp vụ
        public long? IDClassifyCustomer { get; set; } // Id phân loại khách hàng
        public long? IDEvaluate { get; set; } // Id đánh giá
        public long? IDTypeOfOperational { get; set; } // Id loại tác nghiệp
        public string? Name { get; set; }
        public string? TaxCode { get; set; }
        public required string ListType { get; set; }


        // Route info
        public long? IDFromCountryRoute { get; set; } // Id quốc gia đi
        public long? IDToCountryRoute { get; set; } // Id quốc gia đến
        public long? IDFromPortRoute { get; set; } // Id cảng đi
        public long? IDToPortRoute { get; set; } // Id cảng đến

        // ImEx info
        public long? IDFromCountryImEx { get; set; } // Id quốc gia đi
        public long? IDToCountryImEx { get; set; } // Id quốc gia đến
        public long? IDFromPortImEx { get; set; } // Id cảng đi
        public long? IDToPortImEx { get; set; } // Id cảng đến
        public string? Term { get; set; }
        public string? HSCode { get; set; }
        public string? Type { get; set; }
    }
}
