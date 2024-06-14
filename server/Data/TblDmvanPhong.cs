using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMVanPhong")]
public partial class TblDmvanPhong
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("MST")]
    [StringLength(50)]
    public string? Mst { get; set; }

    [Column("IDKeToanTruong")]
    public long? IdkeToanTruong { get; set; }

    [StringLength(50)]
    public string? Code { get; set; }

    [Column("IDCountry")]
    public long? Idcountry { get; set; }

    [Column("IDCity")]
    public long? Idcity { get; set; }

    [Column("NameEN")]
    [StringLength(250)]
    public string? NameEN { get; set; }

    [Column("NameVI")]
    [StringLength(250)]
    public string? NameVI { get; set; }

    [Column("AddressVI")]
    [StringLength(250)]
    public string? AddressVI { get; set; }

    [Column("AddressEN")]
    [StringLength(250)]
    public string? AddressEN { get; set; }

    [StringLength(150)]
    public string? Phone { get; set; }

    [StringLength(150)]
    public string? Fax { get; set; }

    [StringLength(100)]
    public string? Email { get; set; }

    [StringLength(100)]
    public string? Website { get; set; }

    [StringLength(250)]
    public string? Note { get; set; }

    [StringLength(50)]
    public string? TaxCode { get; set; }

    public double? MaxMoneyDebit { get; set; }

    public int? Rating { get; set; }

    public int? PaymentPeriod { get; set; }

    public bool? FlagFavorite { get; set; }

    [Column("ParentID")]
    public long? ParentId { get; set; }

    [Column("IDContact")]
    public long? Idcontact { get; set; }

    public double? SoDuDauKy { get; set; }

    public double? TonCuoiKy { get; set; }

    [Column("IDCurrency")]
    public long? Idcurrency { get; set; }

    public DateOnly? CreateDate { get; set; }

    [ForeignKey("Idcity")]
    [InverseProperty("TblDmvanPhongs")]
    public virtual TblDmcity? IdcityNavigation { get; set; }

    [ForeignKey("Idcontact")]
    [InverseProperty("TblDmvanPhongIdcontactNavigations")]
    public virtual TblNhanSu? IdcontactNavigation { get; set; }

    [ForeignKey("Idcountry")]
    [InverseProperty("TblDmvanPhongs")]
    public virtual TblDmcountry? IdcountryNavigation { get; set; }

    [ForeignKey("Idcurrency")]
    [InverseProperty("TblDmvanPhongs")]
    public virtual TblDmcurrency? IdcurrencyNavigation { get; set; }

    [ForeignKey("IdkeToanTruong")]
    [InverseProperty("TblDmvanPhongIdkeToanTruongNavigations")]
    public virtual TblNhanSu? IdkeToanTruongNavigation { get; set; }

    [InverseProperty("IdvanPhongNavigation")]
    public virtual ICollection<TblDmbankAccount> TblDmbankAccounts { get; set; } = new List<TblDmbankAccount>();

    [InverseProperty("IddmvanPhongNavigation")]
    public virtual ICollection<TblDmphongBan> TblDmphongBans { get; set; } = new List<TblDmphongBan>();

    [InverseProperty("IdvanPhongNavigation")]
    public virtual ICollection<TblNhanSu> TblNhanSus { get; set; } = new List<TblNhanSu>();
}
