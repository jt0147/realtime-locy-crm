using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMPort")]
[Index("Idcity", Name = "iIDCity_tblDMPort")]
[Index("IdquocGia", Name = "iIDQuocGia_tblDMPort")]
public partial class TblDmport
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    public int? EnumPortType { get; set; }

    [Column("IDQuocGia")]
    public long? IdquocGia { get; set; }

    [Column("IDCity")]
    public long? Idcity { get; set; }

    [StringLength(50)]
    public string? Code { get; set; }

    [StringLength(50)]
    public string? TaxCode { get; set; }

    [Column("NameVI")]
    public string? NameVI { get; set; }

    [Column("NameEN")]
    public string? NameEN { get; set; }

    [Column("AddressVI")]
    public string? AddressVI { get; set; }

    [Column("AddressEN")]
    public string? AddressEN { get; set; }

    [StringLength(50)]
    public string? Phone { get; set; }

    [StringLength(50)]
    public string? Fax { get; set; }

    [StringLength(100)]
    public string? Email { get; set; }

    [StringLength(100)]
    public string? Website { get; set; }

    public int? Rating { get; set; }

    [StringLength(250)]
    public string? Note { get; set; }

    public double? MaxMoneyDebit { get; set; }

    public int? PaymentPeriod { get; set; }

    public bool? FlagFavorite { get; set; }

    [Column("IDBank")]
    public long? Idbank { get; set; }

    [StringLength(150)]
    public string? BankAccountNumber { get; set; }

    [StringLength(150)]
    public string? BankBranchName { get; set; }

    [StringLength(150)]
    public string? BankAddress { get; set; }

    [Column("SoDuVND")]
    public double? SoDuVnd { get; set; }

    [Column("SoDuUSD")]
    public double? SoDuUsd { get; set; }

    public double? PhanTramPhaiThuChi { get; set; }

    [ForeignKey("Idbank")]
    [InverseProperty("TblDmports")]
    public virtual TblDmbank? IdbankNavigation { get; set; }

    [ForeignKey("Idcity")]
    [InverseProperty("TblDmports")]
    public virtual TblDmcity? IdcityNavigation { get; set; }

    [ForeignKey("IdquocGia")]
    [InverseProperty("TblDmports")]
    public virtual TblDmcountry? IdquocGiaNavigation { get; set; }

    [InverseProperty("IdfromPortNavigation")]
    public virtual ICollection<TblCustomerListImEx> TblCustomerListImExIdfromPortNavigations { get; set; } = new List<TblCustomerListImEx>();

    [InverseProperty("IdtoPortNavigation")]
    public virtual ICollection<TblCustomerListImEx> TblCustomerListImExIdtoPortNavigations { get; set; } = new List<TblCustomerListImEx>();

    [InverseProperty("IdportNavigation")]
    public virtual ICollection<TblDmcontactList> TblDmcontactLists { get; set; } = new List<TblDmcontactList>();

    [InverseProperty("IdcangDenNavigation")]
    public virtual ICollection<TblDmcustomerTuyenHang> TblDmcustomerTuyenHangIdcangDenNavigations { get; set; } = new List<TblDmcustomerTuyenHang>();

    [InverseProperty("IdcangDiNavigation")]
    public virtual ICollection<TblDmcustomerTuyenHang> TblDmcustomerTuyenHangIdcangDiNavigations { get; set; } = new List<TblDmcustomerTuyenHang>();
}
