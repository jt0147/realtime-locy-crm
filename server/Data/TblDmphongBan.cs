using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblDMPhongBan")]
public partial class TblDmphongBan
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("ParentID")]
    public long? ParentId { get; set; }

    [Column("NameVI")]
    [StringLength(150)]
    public string? NameVI { get; set; }

    [Column("NameEN")]
    [StringLength(150)]
    public string? NameEN { get; set; }

    [StringLength(150)]
    public string? GhiChu { get; set; }

    public bool? FlagFavorite { get; set; }

    [Column("IDDMVanPhong")]
    public long? IddmvanPhong { get; set; }

    public int? EnumNoiDiaOrXuatNhap { get; set; }

    [Column("FlagQuanLyJOB")]
    public bool? FlagQuanLyJob { get; set; }

    [Column("FlagPhuTrachJOB")]
    public bool? FlagPhuTrachJob { get; set; }

    public bool? FlagSale { get; set; }

    public bool? FlagQuanLyKhachHang { get; set; }

    [ForeignKey("IddmvanPhong")]
    [InverseProperty("TblDmphongBans")]
    public virtual TblDmvanPhong? IddmvanPhongNavigation { get; set; }

    [InverseProperty("IdphongBanNavigation")]
    public virtual ICollection<TblNhanSu> TblNhanSus { get; set; } = new List<TblNhanSu>();
}
