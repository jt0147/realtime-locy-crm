using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMContactList")]
public partial class TblDmcontactList
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDContactFun")]
    public long? IdcontactFun { get; set; }

    [Column("NameVI")]
    [StringLength(150)]
    public string? NameVI { get; set; }

    [Column("NameEN")]
    [StringLength(150)]
    public string? NameEN { get; set; }

    [Column("AddressVI")]
    [StringLength(250)]
    public string? AddressVI { get; set; }

    [Column("AddressEN")]
    [StringLength(250)]
    public string? AddressEN { get; set; }

    public int? EnumGioiTinh { get; set; }

    [StringLength(50)]
    public string? HandPhone { get; set; }

    [StringLength(50)]
    public string? HomePhone { get; set; }

    [StringLength(50)]
    public string? Email { get; set; }

    [StringLength(250)]
    public string? Note { get; set; }

    public int? EnumAgentCompanyType { get; set; }

    [Column("IDCustomer")]
    public long? Idcustomer { get; set; }

    [Column("IDPort")]
    public long? Idport { get; set; }

    public bool? FlagFavorite { get; set; }

    [Column("IDBank")]
    public long? Idbank { get; set; }

    [StringLength(150)]
    public string? BankAccountNumber { get; set; }

    [StringLength(150)]
    public string? BankBranchName { get; set; }

    [StringLength(150)]
    public string? BankAddress { get; set; }

    [StringLength(250)]
    public string? Chat { get; set; }

    public bool? FlagActive { get; set; }

    public bool? FlagDaiDien { get; set; }

    [StringLength(250)]
    public string? ChucVu { get; set; }

    [ForeignKey("Idbank")]
    [InverseProperty("TblDmcontactLists")]
    public virtual TblDmbank? IdbankNavigation { get; set; }

    [ForeignKey("IdcontactFun")]
    [InverseProperty("TblDmcontactLists")]
    public virtual TblDmcontactFun? IdcontactFunNavigation { get; set; }

    [ForeignKey("Idcustomer")]
    [InverseProperty("TblDmcontactLists")]
    public virtual TblDmcustomer? IdcustomerNavigation { get; set; }

    [ForeignKey("Idport")]
    [InverseProperty("TblDmcontactLists")]
    public virtual TblDmport? IdportNavigation { get; set; }

    [InverseProperty("IdnguoiLienHeNavigation")]
    public virtual ICollection<TblCustomerTacNghiep> TblCustomerTacNghieps { get; set; } = new List<TblCustomerTacNghiep>();
}
