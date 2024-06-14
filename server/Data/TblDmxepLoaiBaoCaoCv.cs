using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMXepLoaiBaoCaoCV")]
public partial class TblDmxepLoaiBaoCaoCv
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    public string? TenLoai { get; set; }

    public string? GhiChu { get; set; }

    public bool? FlagFavorite { get; set; }

    [InverseProperty("IdxepLoaiNavigation")]
    public virtual ICollection<TblBaoCaoCongViec> TblBaoCaoCongViecs { get; set; } = new List<TblBaoCaoCongViec>();
}
