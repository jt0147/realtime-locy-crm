using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblCustomerTacNghiep")]
public partial class TblCustomerTacNghiep
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDLoaiTacNghiep")]
    public long? IdloaiTacNghiep { get; set; }

    [Column("IDCustomerList")]
    public long? IdcustomerList { get; set; }

    public string? NoiDung { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? DateCreate { get; set; }

    [Column("IDUserCreate")]
    public long? IduserCreate { get; set; }

    [Column("IDDMCustomer")]
    public long? Iddmcustomer { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianThucHien { get; set; }

    [Column("IDNguoiLienHe")]
    public long? IdnguoiLienHe { get; set; }

    public string? KhachHangPhanHoi { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayPhanHoi { get; set; }

    [ForeignKey("Iddmcustomer")]
    [InverseProperty("TblCustomerTacNghieps")]
    public virtual TblDmcustomer? IddmcustomerNavigation { get; set; }

    [ForeignKey("IdloaiTacNghiep")]
    [InverseProperty("TblCustomerTacNghieps")]
    public virtual TblDmloaiTacNghiep? IdloaiTacNghiepNavigation { get; set; }

    [ForeignKey("IdnguoiLienHe")]
    [InverseProperty("TblCustomerTacNghieps")]
    public virtual TblDmcontactList? IdnguoiLienHeNavigation { get; set; }

    [ForeignKey("IduserCreate")]
    [InverseProperty("TblCustomerTacNghieps")]
    public virtual TblSysUser? IduserCreateNavigation { get; set; }
}
