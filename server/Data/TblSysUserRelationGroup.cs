using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblSysUserRelationGroup")]
public partial class TblSysUserRelationGroup
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDGroup")]
    public long? Idgroup { get; set; }

    [Column("IDUser")]
    public long? Iduser { get; set; }

    [ForeignKey("Idgroup")]
    [InverseProperty("TblSysUserRelationGroups")]
    public virtual TblSysUserGroup? IdgroupNavigation { get; set; }

    [ForeignKey("Iduser")]
    [InverseProperty("TblSysUserRelationGroups")]
    public virtual TblSysUser? IduserNavigation { get; set; }
}
