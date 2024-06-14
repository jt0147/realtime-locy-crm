using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblNhanSu")]
public partial class TblNhanSu
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDChucVu")]
    public long? IdchucVu { get; set; }

    [Column("IDPhongBan")]
    public long? IdphongBan { get; set; }

    [Column("IDVanPhong")]
    public long? IdvanPhong { get; set; }

    [Column("MANHANSU")]
    [StringLength(10)]
    public string Manhansu { get; set; } = null!;

    [Column("MST")]
    [StringLength(50)]
    public string? Mst { get; set; }

    [Column("HoTenVI")]
    [StringLength(50)]
    public string HoTenVI { get; set; } = null!;

    [Column("HoTenEN")]
    [StringLength(50)]
    public string? HoTenEN { get; set; }

    public DateOnly NamSinh { get; set; }

    public int? GioiTinh { get; set; }

    [StringLength(250)]
    public string? QueQuan { get; set; }

    [StringLength(250)]
    public string? DiaChiThuongTru { get; set; }

    [StringLength(250)]
    public string? DiaChiHienTai { get; set; }

    [Column("SoCMT")]
    [StringLength(50)]
    public string? SoCmt { get; set; }

    [Column("NoiCapCMT")]
    [StringLength(200)]
    public string? NoiCapCmt { get; set; }

    [Column("NgayCapCMT")]
    public DateOnly? NgayCapCmt { get; set; }

    [StringLength(50)]
    public string? SoHoChieu { get; set; }

    [StringLength(200)]
    public string? NoiCapHoChieu { get; set; }

    public DateOnly? NgayCapHoChieu { get; set; }

    public DateOnly? NgayHetHanHoChieu { get; set; }

    public DateOnly? NgayKyHopDong { get; set; }

    [Column("PictureNV", TypeName = "image")]
    public byte[]? PictureNv { get; set; }

    [Column("SoTaiKhoanNH")]
    [StringLength(50)]
    public string? SoTaiKhoanNh { get; set; }

    [StringLength(20)]
    public string? DiDong { get; set; }

    [StringLength(50)]
    public string? Email { get; set; }

    [StringLength(250)]
    public string? SoTruong { get; set; }

    public int? EnumTinhTrangHonNhan { get; set; }

    public int? EnumNhomMau { get; set; }

    public double? ChieuCao { get; set; }

    public double? CanNang { get; set; }

    [Column("LUONGCOBAN")]
    public long? Luongcoban { get; set; }

    public string? GhiChu { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreateDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? EditDate { get; set; }

    [StringLength(50)]
    public string? SoBangLai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayHetHanBangLai { get; set; }

    public bool? FlagIsManager { get; set; }

    [StringLength(200)]
    public string? SoHopDong { get; set; }

    [Column("SoDuVND")]
    public double? SoDuVnd { get; set; }

    public double? HanMucTamUng { get; set; }

    [Column("SoLuongKH")]
    public int? SoLuongKh { get; set; }

    public bool? FlagDelete { get; set; }

    [Column("IDUserDelete")]
    public long? IduserDelete { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? DateDelete { get; set; }

    [Column("photoUrl")]
    public string? PhotoUrl { get; set; }

    [ForeignKey("IdchucVu")]
    [InverseProperty("TblNhanSus")]
    public virtual TblDmchucVu? IdchucVuNavigation { get; set; }

    [ForeignKey("IdphongBan")]
    [InverseProperty("TblNhanSus")]
    public virtual TblDmphongBan? IdphongBanNavigation { get; set; }

    [ForeignKey("IdvanPhong")]
    [InverseProperty("TblNhanSus")]
    public virtual TblDmvanPhong? IdvanPhongNavigation { get; set; }

    [InverseProperty("IdnhanVienNavigation")]
    public virtual ICollection<TblBaoCaoCongViec> TblBaoCaoCongViecs { get; set; } = new List<TblBaoCaoCongViec>();

    [InverseProperty("IdnhanVienSaleNavigation")]
    public virtual ICollection<TblDmcustomer> TblDmcustomers { get; set; } = new List<TblDmcustomer>();

    [InverseProperty("IdcontactNavigation")]
    public virtual ICollection<TblDmvanPhong> TblDmvanPhongIdcontactNavigations { get; set; } = new List<TblDmvanPhong>();

    [InverseProperty("IdkeToanTruongNavigation")]
    public virtual ICollection<TblDmvanPhong> TblDmvanPhongIdkeToanTruongNavigations { get; set; } = new List<TblDmvanPhong>();

    [InverseProperty("IdnhanVienNavigation")]
    public virtual ICollection<TblNhanSuTreelist> TblNhanSuTreelists { get; set; } = new List<TblNhanSuTreelist>();

    [InverseProperty("User")]
    public virtual ICollection<TblSysFcmtoken> TblSysFcmtokens { get; set; } = new List<TblSysFcmtoken>();

    [InverseProperty("IdnhanVienNavigation")]
    public virtual ICollection<TblSysUser> TblSysUsers { get; set; } = new List<TblSysUser>();
}
