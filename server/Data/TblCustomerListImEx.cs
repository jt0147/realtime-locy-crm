using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblCustomerListImEx")]
public partial class TblCustomerListImEx
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Date { get; set; }

    public string? Type { get; set; }

    [Column("POL")]
    public string? Pol { get; set; }

    [Column("POD")]
    public string? Pod { get; set; }

    public string? Vessel { get; set; }

    public string? Term { get; set; }

    public string? Code { get; set; }

    [Column("COMMD")]
    public string? Commd { get; set; }

    public string? Vol { get; set; }

    [Column("UNT")]
    public string? Unt { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreateDate { get; set; }

    [Column("IDUserCreate")]
    public long? IduserCreate { get; set; }

    [Column("IDCustomerList")]
    public long? IdcustomerList { get; set; }

    [Column("CountryPOL")]
    public string? CountryPol { get; set; }

    [Column("CountryPOD")]
    public string? CountryPod { get; set; }

    [Column("IDFromPort")]
    public long? IdfromPort { get; set; }

    [Column("IDToPort")]
    public long? IdtoPort { get; set; }

    [Column("IDFromCountry")]
    public long? IdfromCountry { get; set; }

    [Column("IDToCountry")]
    public long? IdtoCountry { get; set; }

    [Column("IDDMDieuKienVC")]
    public long? IddmdieuKienVc { get; set; }

    [Column("IDDMCustomer")]
    public long? Iddmcustomer { get; set; }

    [ForeignKey("Iddmcustomer")]
    [InverseProperty("TblCustomerListImExes")]
    public virtual TblDmcustomer? IddmcustomerNavigation { get; set; }

    [ForeignKey("IdfromCountry")]
    [InverseProperty("TblCustomerListImExIdfromCountryNavigations")]
    public virtual TblDmcountry? IdfromCountryNavigation { get; set; }

    [ForeignKey("IdfromPort")]
    [InverseProperty("TblCustomerListImExIdfromPortNavigations")]
    public virtual TblDmport? IdfromPortNavigation { get; set; }

    [ForeignKey("IdtoCountry")]
    [InverseProperty("TblCustomerListImExIdtoCountryNavigations")]
    public virtual TblDmcountry? IdtoCountryNavigation { get; set; }

    [ForeignKey("IdtoPort")]
    [InverseProperty("TblCustomerListImExIdtoPortNavigations")]
    public virtual TblDmport? IdtoPortNavigation { get; set; }

    [ForeignKey("IduserCreate")]
    [InverseProperty("TblCustomerListImExes")]
    public virtual TblSysUser? IduserCreateNavigation { get; set; }
}
