using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblNotification")]
public partial class TblNotification
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("GuidID")]
    public Guid? GuidId { get; set; }

    public long? IdNguoiGui { get; set; }

    public long? IdDoiTuongLienQuan { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? KieuDoiTuongLienQuan { get; set; }

    public long? IdNguoiNhan { get; set; }

    public bool? TrangThaiGui { get; set; }

    public bool? TrangThaiNhan { get; set; }

    [Column("cd", TypeName = "datetime")]
    public DateTime? Cd { get; set; }

    [Column("ud", TypeName = "datetime")]
    public DateTime? Ud { get; set; }

    public long? IdLoaiNotification { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? ListDoiTuongLienQuan { get; set; }
}
