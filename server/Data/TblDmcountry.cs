using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMCountry")]
public partial class TblDmcountry
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [StringLength(50)]
    public string? Code { get; set; }

    [Column("NameVI")]
    [StringLength(50)]
    public string? NameVI { get; set; }

    [Column("NameEN")]
    [StringLength(50)]
    public string? NameEN { get; set; }

    [StringLength(250)]
    public string? Note { get; set; }

    public bool? FlagFavorite { get; set; }

    [InverseProperty("IdfromCountryNavigation")]
    public virtual ICollection<TblCustomerListImEx> TblCustomerListImExIdfromCountryNavigations { get; set; } = new List<TblCustomerListImEx>();

    [InverseProperty("IdtoCountryNavigation")]
    public virtual ICollection<TblCustomerListImEx> TblCustomerListImExIdtoCountryNavigations { get; set; } = new List<TblCustomerListImEx>();

    [InverseProperty("IdquocGiaNavigation")]
    public virtual ICollection<TblDmcity> TblDmcities { get; set; } = new List<TblDmcity>();

    [InverseProperty("IdquocGiaDenNavigation")]
    public virtual ICollection<TblDmcustomerTuyenHang> TblDmcustomerTuyenHangIdquocGiaDenNavigations { get; set; } = new List<TblDmcustomerTuyenHang>();

    [InverseProperty("IdquocGiaDiNavigation")]
    public virtual ICollection<TblDmcustomerTuyenHang> TblDmcustomerTuyenHangIdquocGiaDiNavigations { get; set; } = new List<TblDmcustomerTuyenHang>();

    [InverseProperty("IdquocGiaNavigation")]
    public virtual ICollection<TblDmcustomer> TblDmcustomers { get; set; } = new List<TblDmcustomer>();

    [InverseProperty("IdquocGiaNavigation")]
    public virtual ICollection<TblDmport> TblDmports { get; set; } = new List<TblDmport>();

    [InverseProperty("IdcountryNavigation")]
    public virtual ICollection<TblDmvanPhong> TblDmvanPhongs { get; set; } = new List<TblDmvanPhong>();
}
