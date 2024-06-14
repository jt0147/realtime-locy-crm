using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMLoaiNotification")]
public partial class TblDmloaiNotification
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("TieuDeVI")]
    [StringLength(500)]
    public string? TieuDeVi { get; set; }

    [Column("TieuDeEN")]
    [StringLength(500)]
    public string? TieuDeEn { get; set; }

    [Column("NoiDungVI")]
    [StringLength(500)]
    public string? NoiDungVi { get; set; }

    [Column("NoiDungEN")]
    [StringLength(500)]
    public string? NoiDungEn { get; set; }

    [StringLength(50)]
    public string? Tag { get; set; }

    public bool? FlagFavorite { get; set; }
}
