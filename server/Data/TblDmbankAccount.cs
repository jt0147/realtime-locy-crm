using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMBankAccount")]
public partial class TblDmbankAccount
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDBank")]
    public long? Idbank { get; set; }

    [StringLength(150)]
    public string? BankAccount { get; set; }

    [StringLength(150)]
    public string? BankOwner { get; set; }

    [StringLength(150)]
    public string? BankName { get; set; }

    [StringLength(150)]
    public string? BankBranchName { get; set; }

    [StringLength(150)]
    public string? BankAddress { get; set; }

    public double? SoDuDauKy { get; set; }

    public double? SoDuCuoiKy { get; set; }

    public bool? FlagFavorite { get; set; }

    [Column("IDVanPhong")]
    public long? IdvanPhong { get; set; }

    [Column("IDCurrency")]
    public long? Idcurrency { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreateDate { get; set; }

    [Column("FlagTKGiamDoc")]
    public bool? FlagTkgiamDoc { get; set; }

    [ForeignKey("Idbank")]
    [InverseProperty("TblDmbankAccounts")]
    public virtual TblDmbank? IdbankNavigation { get; set; }

    [ForeignKey("Idcurrency")]
    [InverseProperty("TblDmbankAccounts")]
    public virtual TblDmcurrency? IdcurrencyNavigation { get; set; }

    [ForeignKey("IdvanPhong")]
    [InverseProperty("TblDmbankAccounts")]
    public virtual TblDmvanPhong? IdvanPhongNavigation { get; set; }
}
