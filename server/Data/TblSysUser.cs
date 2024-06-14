using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblSysUser")]
public partial class TblSysUser
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [StringLength(50)]
    public string? UserName { get; set; }

    [StringLength(50)]
    public string? Password { get; set; }

    [Column("IDNhanVien")]
    public long? IdnhanVien { get; set; }

    [Column("IDGroupUser")]
    public long? IdgroupUser { get; set; }

    public bool? Active { get; set; }

    [StringLength(250)]
    public string? GhiChu { get; set; }

    public bool? Fixed { get; set; }

    public string? Permission { get; set; }

    public bool? StatusLogin { get; set; }

    [ForeignKey("IdgroupUser")]
    [InverseProperty("TblSysUsers")]
    public virtual TblSysUserGroup? IdgroupUserNavigation { get; set; }

    [ForeignKey("IdnhanVien")]
    [InverseProperty("TblSysUsers")]
    public virtual TblNhanSu? IdnhanVienNavigation { get; set; }

    [InverseProperty("IduserCreateNavigation")]
    public virtual ICollection<TblBaoCaoCongViec> TblBaoCaoCongViecs { get; set; } = new List<TblBaoCaoCongViec>();

    [InverseProperty("IduserCreateNavigation")]
    public virtual ICollection<TblCustomerListImEx> TblCustomerListImExes { get; set; } = new List<TblCustomerListImEx>();

    [InverseProperty("IduserCreateNavigation")]
    public virtual ICollection<TblCustomerTacNghiep> TblCustomerTacNghieps { get; set; } = new List<TblCustomerTacNghiep>();

    [InverseProperty("IduserCreateNavigation")]
    public virtual ICollection<TblDmcustomerDanhGium> TblDmcustomerDanhGia { get; set; } = new List<TblDmcustomerDanhGium>();

    [InverseProperty("IduserCreateNavigation")]
    public virtual ICollection<TblDmcustomer> TblDmcustomerIduserCreateNavigations { get; set; } = new List<TblDmcustomer>();

    [InverseProperty("IduserDeleteNavigation")]
    public virtual ICollection<TblDmcustomer> TblDmcustomerIduserDeleteNavigations { get; set; } = new List<TblDmcustomer>();

    [InverseProperty("IduserGiaoViecNavigation")]
    public virtual ICollection<TblDmcustomer> TblDmcustomerIduserGiaoViecNavigations { get; set; } = new List<TblDmcustomer>();

    [InverseProperty("IduserTraKhachNavigation")]
    public virtual ICollection<TblDmcustomer> TblDmcustomerIduserTraKhachNavigations { get; set; } = new List<TblDmcustomer>();

    [InverseProperty("IduserUploadNavigation")]
    public virtual ICollection<TblJobdocument> TblJobdocuments { get; set; } = new List<TblJobdocument>();

    [InverseProperty("IduserNavigation")]
    public virtual ICollection<TblJobuserAccess> TblJobuserAccesses { get; set; } = new List<TblJobuserAccess>();

    [InverseProperty("IduserPheDuyetNavigation")]
    public virtual ICollection<TblJobuserPheDuyet> TblJobuserPheDuyets { get; set; } = new List<TblJobuserPheDuyet>();

    [InverseProperty("IduserNavigation")]
    public virtual ICollection<TblSysUserNotification> TblSysUserNotifications { get; set; } = new List<TblSysUserNotification>();

    [InverseProperty("IduserNavigation")]
    public virtual ICollection<TblSysUserRelationGroup> TblSysUserRelationGroups { get; set; } = new List<TblSysUserRelationGroup>();
}
