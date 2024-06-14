using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMContactFun")]
public partial class TblDmcontactFun
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("FunctionalVI")]
    [StringLength(150)]
    public string? FunctionalVi { get; set; }

    [Column("FunctionalEN")]
    [StringLength(150)]
    public string? FunctionalEn { get; set; }

    [StringLength(150)]
    public string? Note { get; set; }

    public bool? FlagFavorite { get; set; }

    [InverseProperty("IdcontactFunNavigation")]
    public virtual ICollection<TblDmcontactList> TblDmcontactLists { get; set; } = new List<TblDmcontactList>();
}
