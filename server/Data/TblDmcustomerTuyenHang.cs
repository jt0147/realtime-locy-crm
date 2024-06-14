using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMCustomerTuyenHang")]
public partial class TblDmcustomerTuyenHang
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("enumLoaiVanChuyen")]
    public int? EnumLoaiVanChuyen { get; set; }

    [Column("IDQuocGiaDi")]
    public long? IdquocGiaDi { get; set; }

    [Column("IDQuocGiaDen")]
    public long? IdquocGiaDen { get; set; }

    [Column("IDCangDi")]
    public long? IdcangDi { get; set; }

    [Column("IDCangDen")]
    public long? IdcangDen { get; set; }

    [Column("IDDMCustomer")]
    public long? Iddmcustomer { get; set; }

    [Column("IDDMLoaiHinhVanChuyen")]
    public long? IddmloaiHinhVanChuyen { get; set; }

    [ForeignKey("IdcangDen")]
    [InverseProperty("TblDmcustomerTuyenHangIdcangDenNavigations")]
    public virtual TblDmport? IdcangDenNavigation { get; set; }

    [ForeignKey("IdcangDi")]
    [InverseProperty("TblDmcustomerTuyenHangIdcangDiNavigations")]
    public virtual TblDmport? IdcangDiNavigation { get; set; }

    [ForeignKey("Iddmcustomer")]
    [InverseProperty("TblDmcustomerTuyenHangs")]
    public virtual TblDmcustomer? IddmcustomerNavigation { get; set; }

    [ForeignKey("IddmloaiHinhVanChuyen")]
    [InverseProperty("TblDmcustomerTuyenHangs")]
    public virtual TblDmloaiHinhVanChuyen? IddmloaiHinhVanChuyenNavigation { get; set; }

    [ForeignKey("IdquocGiaDen")]
    [InverseProperty("TblDmcustomerTuyenHangIdquocGiaDenNavigations")]
    public virtual TblDmcountry? IdquocGiaDenNavigation { get; set; }

    [ForeignKey("IdquocGiaDi")]
    [InverseProperty("TblDmcustomerTuyenHangIdquocGiaDiNavigations")]
    public virtual TblDmcountry? IdquocGiaDiNavigation { get; set; }
}
