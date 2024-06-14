using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMContractType")]
public partial class TblDmcontractType
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [StringLength(50)]
    public string? Code { get; set; }

    [Column("NameVI")]
    [StringLength(50)]
    public string? NameVI { get; set; }

    [Column("NameEN")]
    [StringLength(50)]
    public string? NameEN { get; set; }

    [StringLength(250)]
    public string? Note { get; set; }

    public bool? FlagFavorite { get; set; }
}
