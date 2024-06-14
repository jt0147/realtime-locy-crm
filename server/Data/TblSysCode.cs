using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblSysCode")]
public partial class TblSysCode
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    public int? EnumLoaiCongViec { get; set; }

    public bool? FlagActive { get; set; }

    public int? EnumKieuSinhMa { get; set; }

    public string? GhiChu { get; set; }

    [Column("IDUserCreate")]
    public long? IduserCreate { get; set; }

    [Column("IDUserEdit")]
    public long? IduserEdit { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? DateCreate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? DateEdit { get; set; }

    [StringLength(100)]
    public string? CodeFormat { get; set; }

    [Column("EnumTangSTTTgian")]
    public int? EnumTangStttgian { get; set; }

    [Column("EnumTangSTTLoaiHinh")]
    public int? EnumTangSttloaiHinh { get; set; }

    [Column("STTBatDau")]
    public int? SttbatDau { get; set; }

    [Column("NgayBDApDung", TypeName = "datetime")]
    public DateTime? NgayBdapDung { get; set; }

    [Column("NgayBD")]
    public int? NgayBd { get; set; }

    public int? SoNgay { get; set; }

    public int? EnumLoaiKy { get; set; }

    [Column("EnumNgayTinhSTT")]
    public int? EnumNgayTinhStt { get; set; }

    [Column("EnumTangSTTCustomer")]
    public int? EnumTangSttcustomer { get; set; }

    [InverseProperty("IdsysCodeNavigation")]
    public virtual ICollection<TblSysCodeKey> TblSysCodeKeys { get; set; } = new List<TblSysCodeKey>();

    [InverseProperty("IdsysCodeNavigation")]
    public virtual ICollection<TblSysCodeKyHieu> TblSysCodeKyHieus { get; set; } = new List<TblSysCodeKyHieu>();
}
