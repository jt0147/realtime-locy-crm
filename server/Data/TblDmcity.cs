using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMCity")]
[Index("IdquocGia", Name = "iIDQuocGia_tblDMCity")]
public partial class TblDmcity
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [StringLength(50)]
    public string? Code { get; set; }

    [Column("IDQuocGia")]
    public long? IdquocGia { get; set; }

    [Column("NameEN")]
    [StringLength(100)]
    public string? NameEN { get; set; }

    [Column("NameVI")]
    [StringLength(100)]
    public string? NameVI { get; set; }

    [StringLength(10)]
    public string? Note { get; set; }

    public bool? FlagFavorite { get; set; }

    [ForeignKey("IdquocGia")]
    [InverseProperty("TblDmcities")]
    public virtual TblDmcountry? IdquocGiaNavigation { get; set; }

    [InverseProperty("IdcityNavigation")]
    public virtual ICollection<TblDmcustomer> TblDmcustomers { get; set; } = new List<TblDmcustomer>();

    [InverseProperty("IdcityNavigation")]
    public virtual ICollection<TblDmport> TblDmports { get; set; } = new List<TblDmport>();

    [InverseProperty("IdcityNavigation")]
    public virtual ICollection<TblDmvanPhong> TblDmvanPhongs { get; set; } = new List<TblDmvanPhong>();
}
