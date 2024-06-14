using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMPhanLoaiKhachHang")]
public partial class TblDmphanLoaiKhachHang
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [StringLength(200)]
    public string? Code { get; set; }

    [Column("NameVI")]
    public string? NameVI { get; set; }

    [Column("NameEN")]
    public string? NameEN { get; set; }

    [InverseProperty("IddmphanLoaiKhachHangNavigation")]
    public virtual ICollection<TblDmcustomerPhanLoaiKh> TblDmcustomerPhanLoaiKhs { get; set; } = new List<TblDmcustomerPhanLoaiKh>();
}
