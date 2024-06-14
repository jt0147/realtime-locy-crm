using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblSysUserGroup")]
public partial class TblSysUserGroup
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [StringLength(100)]
    public string? GroupName { get; set; }

    [StringLength(150)]
    public string? GhiChu { get; set; }

    public string? Permission { get; set; }

    [InverseProperty("IduserGroupNavigation")]
    public virtual ICollection<TblJobuserAccess> TblJobuserAccesses { get; set; } = new List<TblJobuserAccess>();

    [InverseProperty("IdgroupNavigation")]
    public virtual ICollection<TblSysUserRelationGroup> TblSysUserRelationGroups { get; set; } = new List<TblSysUserRelationGroup>();

    [InverseProperty("IdgroupUserNavigation")]
    public virtual ICollection<TblSysUser> TblSysUsers { get; set; } = new List<TblSysUser>();
}
