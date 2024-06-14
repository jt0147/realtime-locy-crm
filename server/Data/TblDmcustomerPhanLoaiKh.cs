using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMCustomerPhanLoaiKH")]
public partial class TblDmcustomerPhanLoaiKh
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("IDDMCustomer")]
    public long? Iddmcustomer { get; set; }

    [Column("IDDMPhanLoaiKhachHang")]
    public long? IddmphanLoaiKhachHang { get; set; }

    [ForeignKey("Iddmcustomer")]
    [InverseProperty("TblDmcustomerPhanLoaiKhs")]
    public virtual TblDmcustomer? IddmcustomerNavigation { get; set; }

    [ForeignKey("IddmphanLoaiKhachHang")]
    [InverseProperty("TblDmcustomerPhanLoaiKhs")]
    public virtual TblDmphanLoaiKhachHang? IddmphanLoaiKhachHangNavigation { get; set; }
}
