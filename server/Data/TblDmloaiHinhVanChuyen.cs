using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMLoaiHinhVanChuyen")]
public partial class TblDmloaiHinhVanChuyen
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("NameVI")]
    public string? NameVI { get; set; }

    [Column("NameEN")]
    public string? NameEN { get; set; }

    public string? Code { get; set; }

    public bool? FlagFavorite { get; set; }

    [InverseProperty("IddmloaiHinhVanChuyenNavigation")]
    public virtual ICollection<TblDmcustomerTuyenHang> TblDmcustomerTuyenHangs { get; set; } = new List<TblDmcustomerTuyenHang>();
}
