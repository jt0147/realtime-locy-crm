using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMCustomerType")]
public partial class TblDmcustomerType
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [StringLength(200)]
    public string? Code { get; set; }

    [Column("NameVI")]
    public string? NameVI { get; set; }

    [Column("NameEN")]
    public string? NameEN { get; set; }

    [InverseProperty("IddmcustomerTypeNavigation")]
    public virtual ICollection<TblDmcustomerDanhGium> TblDmcustomerDanhGia { get; set; } = new List<TblDmcustomerDanhGium>();
}
