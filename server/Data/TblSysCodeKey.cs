using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblSysCodeKey")]
public partial class TblSysCodeKey
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDSysCode")]
    public long? IdsysCode { get; set; }

    public int? EnumLoaiKey { get; set; }

    [StringLength(10)]
    public string? KeyCode { get; set; }

    [StringLength(50)]
    public string? Format { get; set; }

    [ForeignKey("IdsysCode")]
    [InverseProperty("TblSysCodeKeys")]
    public virtual TblSysCode? IdsysCodeNavigation { get; set; }
}
