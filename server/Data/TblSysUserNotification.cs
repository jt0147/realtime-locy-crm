using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblSysUserNotification")]
public partial class TblSysUserNotification
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDUser")]
    public long? Iduser { get; set; }

    [Column("FlagNewJOB")]
    public bool? FlagNewJob { get; set; }

    public bool? FlagDebit { get; set; }

    [ForeignKey("Iduser")]
    [InverseProperty("TblSysUserNotifications")]
    public virtual TblSysUser? IduserNavigation { get; set; }
}
