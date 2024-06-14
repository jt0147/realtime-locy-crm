using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMBank")]
public partial class TblDmbank
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [StringLength(250)]
    public string? BankName { get; set; }

    [StringLength(50)]
    public string? Manager { get; set; }

    [Column(TypeName = "image")]
    public byte[]? Logo { get; set; }

    [StringLength(250)]
    public string? Address { get; set; }

    [StringLength(50)]
    public string? Phone { get; set; }

    [StringLength(50)]
    public string? Fax { get; set; }

    [StringLength(50)]
    public string? Email { get; set; }

    [StringLength(250)]
    public string? Note { get; set; }

    public bool? FlagFavorite { get; set; }

    [InverseProperty("IdbankNavigation")]
    public virtual ICollection<TblDmbankAccount> TblDmbankAccounts { get; set; } = new List<TblDmbankAccount>();

    [InverseProperty("IdbankNavigation")]
    public virtual ICollection<TblDmcontactList> TblDmcontactLists { get; set; } = new List<TblDmcontactList>();

    [InverseProperty("IdbankNavigation")]
    public virtual ICollection<TblDmcustomer> TblDmcustomers { get; set; } = new List<TblDmcustomer>();

    [InverseProperty("IdbankNavigation")]
    public virtual ICollection<TblDmport> TblDmports { get; set; } = new List<TblDmport>();
}
