namespace VslCrmApiRealTime.Models.Requests.Customer
{
    public class DeliveryCustomerRequest
    {
        public required long IDAccountEmployee { get; set; } // Id tài khoản của nhân viên
        public required long IDEmployee { get; set; } // Id nhân viên sale
        public required long IDUserAssign { get; set; } // Id user giao việc
        public required long[] IDCustomers { get; set; }
        public string? JobAssignmentInfo { get; set; } // Thông tin giao việc
    }
}
