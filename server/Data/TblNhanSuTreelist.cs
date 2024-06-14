using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblNhanSuTreelist")]
public partial class TblNhanSuTreelist
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("ParentID")]
    public long? ParentId { get; set; }

    [StringLength(200)]
    public string? NameGroup { get; set; }

    [Column("IDNhanVien")]
    public long? IdnhanVien { get; set; }

    public bool? FlagViewAllGroup { get; set; }

    [ForeignKey("IdnhanVien")]
    [InverseProperty("TblNhanSuTreelists")]
    public virtual TblNhanSu? IdnhanVienNavigation { get; set; }
}
