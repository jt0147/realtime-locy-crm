using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMCustomerNghiepVu")]
public partial class TblDmcustomerNghiepVu
{
    [Key]
    [Column("ID")]
    public int Id { get; set; }

    [Column("IDDMCustomer")]
    public long? Iddmcustomer { get; set; }

    [Column("IDDMNghiepVu")]
    public long? IddmnghiepVu { get; set; }

    [ForeignKey("Iddmcustomer")]
    [InverseProperty("TblDmcustomerNghiepVus")]
    public virtual TblDmcustomer? IddmcustomerNavigation { get; set; }

    [ForeignKey("IddmnghiepVu")]
    [InverseProperty("TblDmcustomerNghiepVus")]
    public virtual TblDmnghiepVu? IddmnghiepVuNavigation { get; set; }
}
