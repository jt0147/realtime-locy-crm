using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblSysConfig")]
public partial class TblSysConfig
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("APPKEY")]
    [StringLength(50)]
    public string? Appkey { get; set; }

    [Column("SERVERIP")]
    [StringLength(50)]
    public string? Serverip { get; set; }

    [Column("CUSTOMERNAME")]
    [StringLength(250)]
    public string? Customername { get; set; }

    [Column("ADDRESS")]
    public string? Address { get; set; }

    [Column("TELFAX")]
    [StringLength(250)]
    public string? Telfax { get; set; }

    [StringLength(250)]
    public string? Website { get; set; }

    [StringLength(250)]
    public string? Email { get; set; }

    [Column("MST")]
    [StringLength(250)]
    public string? Mst { get; set; }

    [StringLength(250)]
    public string? HotLine { get; set; }

    [Column("FLAG")]
    public int? Flag { get; set; }

    [Column("FLAGUSE")]
    public int? Flaguse { get; set; }

    [Column(TypeName = "image")]
    public byte[]? Logo { get; set; }

    [Column(TypeName = "image")]
    public byte[]? LetterHead { get; set; }

    [Column(TypeName = "image")]
    public byte[]? ReportHeader { get; set; }

    public double? LogoW { get; set; }

    public double? LogoH { get; set; }

    public double? LogoLeft { get; set; }

    public double? LogoTop { get; set; }

    public double? ReportHeaderW { get; set; }

    public double? ReportHeaderH { get; set; }

    public double? ReportHeaderLeft { get; set; }

    public double? ReportHeaderTop { get; set; }

    public double? LetterHeaderW { get; set; }

    public double? LetterHeaderH { get; set; }

    public double? LetterHeaderLeft { get; set; }

    public double? LetterHeaderTop { get; set; }

    public double? LetterHeaderDistanceToLogo { get; set; }

    [Column("CUSTOMERNameVI")]
    [StringLength(250)]
    public string? CustomerNameVI { get; set; }

    public double? NumberUser { get; set; }

    public bool? FlagFontSize { get; set; }
}
