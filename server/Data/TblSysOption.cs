using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblSysOption")]
public partial class TblSysOption
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    public int? Language { get; set; }

    [Column("JOBIDFormat")]
    [StringLength(50)]
    public string? Jobidformat { get; set; }

    [Column("USDDecimalCal")]
    public int? UsddecimalCal { get; set; }

    public bool? SuDung { get; set; }

    [Column("EnumKieuTangSTT")]
    public int? EnumKieuTangStt { get; set; }

    public double? TyGia { get; set; }

    public int? EnumCompany { get; set; }

    [Column("EnumShowJOBInfo")]
    public int? EnumShowJobinfo { get; set; }

    public bool? FlagHideToDo { get; set; }

    [Column("NgayBD")]
    public int? NgayBd { get; set; }

    [Column("NgayKT")]
    public int? NgayKt { get; set; }

    public int? EnumAttachFileType { get; set; }

    [Column("EnumJOBID")]
    public int? EnumJobid { get; set; }

    [Column("STTBatDau")]
    public int? SttbatDau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayBatDau { get; set; }

    public bool? FlagSetting { get; set; }

    public bool? FlagNewTab { get; set; }

    public bool? FlagSaveGridFilter { get; set; }

    public bool? FlagPheDuyetChi { get; set; }

    [Column("SoLuongKH")]
    public int? SoLuongKh { get; set; }

    public int? NgayNhanKhach { get; set; }
}
