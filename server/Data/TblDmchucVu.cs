using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMChucVu")]
public partial class TblDmchucVu
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [StringLength(50)]
    public string? Code { get; set; }

    [Column("NameVI")]
    [StringLength(250)]
    public string? NameVI { get; set; }

    [Column("NameEN")]
    [StringLength(250)]
    public string? NameEN { get; set; }

    public bool? FlagFavorite { get; set; }

    public int? ShowOrder { get; set; }

    [InverseProperty("IdchucVuNavigation")]
    public virtual ICollection<TblNhanSu> TblNhanSus { get; set; } = new List<TblNhanSu>();
}
