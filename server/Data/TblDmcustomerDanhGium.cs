using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMCustomerDanhGia")]
public partial class TblDmcustomerDanhGium
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDDMCustomer")]
    public long? Iddmcustomer { get; set; }

    [Column("IDDMCustomerType")]
    public long? IddmcustomerType { get; set; }

    [Column("IDUserCreate")]
    public long? IduserCreate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? DateCreate { get; set; }

    public string? GhiChu { get; set; }

    [ForeignKey("Iddmcustomer")]
    [InverseProperty("TblDmcustomerDanhGia")]
    public virtual TblDmcustomer? IddmcustomerNavigation { get; set; }

    [ForeignKey("IddmcustomerType")]
    [InverseProperty("TblDmcustomerDanhGia")]
    public virtual TblDmcustomerType? IddmcustomerTypeNavigation { get; set; }

    [ForeignKey("IduserCreate")]
    [InverseProperty("TblDmcustomerDanhGia")]
    public virtual TblSysUser? IduserCreateNavigation { get; set; }
}
