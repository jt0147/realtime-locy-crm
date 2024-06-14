using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblJOBNotification")]
public partial class TblJobnotification
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDJOB")]
    public long? Idjob { get; set; }

    [Column("IDObject")]
    public long? Idobject { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayThongBao { get; set; }

    public bool? FlagTraTheoKy { get; set; }
}
