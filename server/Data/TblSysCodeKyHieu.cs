using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblSysCodeKyHieu")]
public partial class TblSysCodeKyHieu
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDSysCode")]
    public long? IdsysCode { get; set; }

    [Column("EnumLoaiKH")]
    public int? EnumLoaiKh { get; set; }

    [Column("KH")]
    [StringLength(50)]
    public string? Kh { get; set; }

    [ForeignKey("IdsysCode")]
    [InverseProperty("TblSysCodeKyHieus")]
    public virtual TblSysCode? IdsysCodeNavigation { get; set; }
}
