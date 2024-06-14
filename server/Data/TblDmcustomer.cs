using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMCustomer")]
public partial class TblDmcustomer
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDQuocGia")]
    public long? IdquocGia { get; set; }

    [Column("IDCity")]
    public long? Idcity { get; set; }

    [StringLength(100)]
    public string? Code { get; set; }

    [Column("NameVI")]
    public string? NameVI { get; set; }

    [Column("NameEN")]
    public string? NameEN { get; set; }

    [Column("AddressVI")]
    public string? AddressVI { get; set; }

    [Column("AddressEN")]
    public string? AddressEN { get; set; }

    [StringLength(30)]
    public string? TaxCode { get; set; }

    [StringLength(150)]
    public string? Phone { get; set; }

    [StringLength(150)]
    public string? Fax { get; set; }

    [StringLength(100)]
    public string? Email { get; set; }

    [StringLength(100)]
    public string? Website { get; set; }

    public string? Note { get; set; }

    public int? Rating { get; set; }

    public bool? FlagFavorite { get; set; }

    [Column("IDBank")]
    public long? Idbank { get; set; }

    [StringLength(150)]
    public string? BankAccountNumber { get; set; }

    [StringLength(150)]
    public string? BankBranchName { get; set; }

    public string? BankAddress { get; set; }

    [Column("FlagCRM")]
    public bool? FlagCrm { get; set; }

    [Column("IDNhanVienSale")]
    public long? IdnhanVienSale { get; set; }

    [Column("IDUserCreate")]
    public long? IduserCreate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? DateCreate { get; set; }

    public bool? FlagActive { get; set; }

    [StringLength(100)]
    public string? MaChiNhanh { get; set; }

    public int? EnumLoaiKhachHang { get; set; }

    public bool? FlagDel { get; set; }

    [Column("IDLoaiDoanhNghiep")]
    public long? IdloaiDoanhNghiep { get; set; }

    [Column("IDUserDelete")]
    public long? IduserDelete { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? DateDelete { get; set; }

    public string? LyDoXoa { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTuongTac { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayChonKhach { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTraVe { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayChotKhach { get; set; }

    [Column("STTMax_TacNghiep")]
    public int? SttmaxTacNghiep { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTacNghiep { get; set; }

    public int? EnumGiaoNhan { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayGiao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayNhan { get; set; }

    [Column("IDUserGiaoViec")]
    public long? IduserGiaoViec { get; set; }

    [Column("IDUserTraKhach")]
    public long? IduserTraKhach { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayKetThucNhan { get; set; }

    public string? ListTacNghiepText { get; set; }

    public string? ListTuyenHangText { get; set; }

    public string? ListPhanHoiText { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTuTraKhach { get; set; }

    public string? ThongTinGiaoViec { get; set; }

    public string? LyDoTuChoi { get; set; }

    [Column("IDTacNghiepCuoi")]
    public long? IdtacNghiepCuoi { get; set; }

    [StringLength(150)]
    public string? MauTacNghiepCuoi { get; set; }

    [ForeignKey("Idbank")]
    [InverseProperty("TblDmcustomers")]
    public virtual TblDmbank? IdbankNavigation { get; set; }

    [ForeignKey("Idcity")]
    [InverseProperty("TblDmcustomers")]
    public virtual TblDmcity? IdcityNavigation { get; set; }

    [ForeignKey("IdloaiDoanhNghiep")]
    [InverseProperty("TblDmcustomers")]
    public virtual TblDmloaiDoanhNghiep? IdloaiDoanhNghiepNavigation { get; set; }

    [ForeignKey("IdnhanVienSale")]
    [InverseProperty("TblDmcustomers")]
    public virtual TblNhanSu? IdnhanVienSaleNavigation { get; set; }

    [ForeignKey("IdquocGia")]
    [InverseProperty("TblDmcustomers")]
    public virtual TblDmcountry? IdquocGiaNavigation { get; set; }

    [ForeignKey("IduserCreate")]
    [InverseProperty("TblDmcustomerIduserCreateNavigations")]
    public virtual TblSysUser? IduserCreateNavigation { get; set; }

    [ForeignKey("IduserDelete")]
    [InverseProperty("TblDmcustomerIduserDeleteNavigations")]
    public virtual TblSysUser? IduserDeleteNavigation { get; set; }

    [ForeignKey("IduserGiaoViec")]
    [InverseProperty("TblDmcustomerIduserGiaoViecNavigations")]
    public virtual TblSysUser? IduserGiaoViecNavigation { get; set; }

    [ForeignKey("IduserTraKhach")]
    [InverseProperty("TblDmcustomerIduserTraKhachNavigations")]
    public virtual TblSysUser? IduserTraKhachNavigation { get; set; }

    [InverseProperty("IddmcustomerNavigation")]
    public virtual ICollection<TblCustomerListImEx> TblCustomerListImExes { get; set; } = new List<TblCustomerListImEx>();

    [InverseProperty("IddmcustomerNavigation")]
    public virtual ICollection<TblCustomerTacNghiep> TblCustomerTacNghieps { get; set; } = new List<TblCustomerTacNghiep>();

    [InverseProperty("IdcustomerNavigation")]
    public virtual ICollection<TblDmcontactList> TblDmcontactLists { get; set; } = new List<TblDmcontactList>();

    [InverseProperty("IddmcustomerNavigation")]
    public virtual ICollection<TblDmcustomerDanhGium> TblDmcustomerDanhGia { get; set; } = new List<TblDmcustomerDanhGium>();

    [InverseProperty("IddmcustomerNavigation")]
    public virtual ICollection<TblDmcustomerNghiepVu> TblDmcustomerNghiepVus { get; set; } = new List<TblDmcustomerNghiepVu>();

    [InverseProperty("IddmcustomerNavigation")]
    public virtual ICollection<TblDmcustomerPhanLoaiKh> TblDmcustomerPhanLoaiKhs { get; set; } = new List<TblDmcustomerPhanLoaiKh>();

    [InverseProperty("IddmcustomerNavigation")]
    public virtual ICollection<TblDmcustomerTuyenHang> TblDmcustomerTuyenHangs { get; set; } = new List<TblDmcustomerTuyenHang>();
}
