namespace VslCrmApiRealTime.Models.DTOs.Profile
{
    public class ProfileDto
    {
        public long Id { get; set; }
        public string Username { get; set; } = ""; // Tên đăng nhập
        public string Permission { get; set; } = ""; // Quyền tài khoản nhân viên
        public bool Active { get; set; } // Trạng thái tài khoản
        public long? IDEmployee { get; set; } // Mã nhân viên

        public long? IDPosition { get; set; } // Mã chức vụ
        public string Position { get; set; } = ""; // Chức vụ
        public long? IDDepartment { get; set; } // Mã phòng ban
        public string Department { get; set; } = ""; // Phòng ban
        public long? IDOffice { get; set; } // Mã văn phòng
        public string Office { get; set; } = ""; // Văn phòng

        public string EmployeeCode { get; set; } = ""; // Mã nhân sự
        public string FullNameVI { get; set; } = ""; // Họ tên tiếng việt
        public string FullNameEN { get; set; } = ""; // Họ tên tiếng anh
        public string BirthDay { get; set; } = ""; // Ngày tháng năm sinh
        public int? Gender { get; set; } // Giới tính
        public string HomeTown { get; set; } = ""; // Quê quán
        public string Address { get; set; } = ""; // Địa chỉ hiện tại
        public string IDNumber { get; set; } = ""; // Số chứng minh thư
        public string PlaceForIDCard { get; set; } = ""; // Nơi cấp chứng minh thư
        public string DayForIDCard { get; set; } = ""; // Ngày cấp chứng minh thư
        public string Phone { get; set; } = ""; // Số điện thoại di động
        public string Email { get; set; } = ""; // Thư điện tử
        public string PhotoURL { get; set; } = "";
        public string Note { get; set; } = ""; // Ghi chú
        public int? NumberOfManagedCustomers { get; set; } = 0; // Số lượng khách hàng mà nhân viên có thể quản lý

        public bool? FlagDelete { get; set; }
        public long? IDUserDelete { get; set; }
        public string? DateDelete { get; set; }
    }
}
