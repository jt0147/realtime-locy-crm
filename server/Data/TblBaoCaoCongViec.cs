using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblBaoCaoCongViec")]
public partial class TblBaoCaoCongViec
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDNhanVien")]
    public long? IdnhanVien { get; set; }

    public string? NoiDung { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreateDate { get; set; }

    [Column("IDUserCreate")]
    public long? IduserCreate { get; set; }

    public double? Amount { get; set; }

    public string? XepLoai { get; set; }

    public string? GhiChu { get; set; }

    [Column("IDXepLoai")]
    public long? IdxepLoai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianThucHien { get; set; }

    [ForeignKey("IdnhanVien")]
    [InverseProperty("TblBaoCaoCongViecs")]
    public virtual TblNhanSu? IdnhanVienNavigation { get; set; }

    [ForeignKey("IduserCreate")]
    [InverseProperty("TblBaoCaoCongViecs")]
    public virtual TblSysUser? IduserCreateNavigation { get; set; }

    [ForeignKey("IdxepLoai")]
    [InverseProperty("TblBaoCaoCongViecs")]
    public virtual TblDmxepLoaiBaoCaoCv? IdxepLoaiNavigation { get; set; }
}
