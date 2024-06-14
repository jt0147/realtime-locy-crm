using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMCurrency")]
public partial class TblDmcurrency
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [StringLength(10)]
    public string? Code { get; set; }

    [Column("NameVI")]
    [StringLength(50)]
    public string? NameVI { get; set; }

    [Column("NameEN")]
    [StringLength(50)]
    public string? NameEN { get; set; }

    [StringLength(10)]
    public string? KyHieu { get; set; }

    [StringLength(250)]
    public string? Note { get; set; }

    public bool? IsBasicCurrency { get; set; }

    public bool? FlagFavorite { get; set; }

    [InverseProperty("IdcurrencyNavigation")]
    public virtual ICollection<TblDmbankAccount> TblDmbankAccounts { get; set; } = new List<TblDmbankAccount>();

    [InverseProperty("IdcurrencyNavigation")]
    public virtual ICollection<TblDmvanPhong> TblDmvanPhongs { get; set; } = new List<TblDmvanPhong>();
}
