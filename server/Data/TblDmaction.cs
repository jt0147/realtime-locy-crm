using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMAction")]
public partial class TblDmaction
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [StringLength(50)]
    public string? Name { get; set; }

    [StringLength(100)]
    public string? Description { get; set; }

    public bool? FlagFavorite { get; set; }
}
