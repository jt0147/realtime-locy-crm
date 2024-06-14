using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblJOBUserAccess")]
public partial class TblJobuserAccess
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDJOB")]
    public long? Idjob { get; set; }

    [Column("IDUser")]
    public long? Iduser { get; set; }

    [Column("IDUserGroup")]
    public long? IduserGroup { get; set; }

    [Column("IDBooking")]
    public long? Idbooking { get; set; }

    [Column("IDJOBBaoGia")]
    public long? IdjobbaoGia { get; set; }

    [Column("IDJOBOrder")]
    public long? Idjoborder { get; set; }

    [ForeignKey("IduserGroup")]
    [InverseProperty("TblJobuserAccesses")]
    public virtual TblSysUserGroup? IduserGroupNavigation { get; set; }

    [ForeignKey("Iduser")]
    [InverseProperty("TblJobuserAccesses")]
    public virtual TblSysUser? IduserNavigation { get; set; }
}
