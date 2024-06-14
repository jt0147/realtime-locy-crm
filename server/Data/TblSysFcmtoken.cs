using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblSysFCMToken")]
public partial class TblSysFcmtoken
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("UserID")]
    public long? UserId { get; set; }

    [Column("FCMToken")]
    [StringLength(250)]
    public string? Fcmtoken { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("TblSysFcmtokens")]
    public virtual TblNhanSu? User { get; set; }
}
