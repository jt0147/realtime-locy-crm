using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMLoaiTacNghiep")]
public partial class TblDmloaiTacNghiep
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    public string? Name { get; set; }

    public bool? FlagFavorite { get; set; }

    [StringLength(200)]
    public string? TenMau { get; set; }

    public int? G { get; set; }

    public int? R { get; set; }

    public int? B { get; set; }

    [Column("STT")]
    public int? Stt { get; set; }

    public int? NgayTuTraKhac { get; set; }

    [InverseProperty("IdloaiTacNghiepNavigation")]
    public virtual ICollection<TblCustomerTacNghiep> TblCustomerTacNghieps { get; set; } = new List<TblCustomerTacNghiep>();
}
