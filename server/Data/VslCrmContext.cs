using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

public partial class VslCrmContext : DbContext
{
    public VslCrmContext()
    {
    }

    public VslCrmContext(DbContextOptions<VslCrmContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblBaoCaoCongViec> TblBaoCaoCongViecs { get; set; }

    public virtual DbSet<TblCustomerListImEx> TblCustomerListImExes { get; set; }

    public virtual DbSet<TblCustomerTacNghiep> TblCustomerTacNghieps { get; set; }

    public virtual DbSet<TblDmaction> TblDmactions { get; set; }

    public virtual DbSet<TblDmbank> TblDmbanks { get; set; }

    public virtual DbSet<TblDmbankAccount> TblDmbankAccounts { get; set; }

    public virtual DbSet<TblDmchucVu> TblDmchucVus { get; set; }

    public virtual DbSet<TblDmcity> TblDmcities { get; set; }

    public virtual DbSet<TblDmcontactFun> TblDmcontactFuns { get; set; }

    public virtual DbSet<TblDmcontactList> TblDmcontactLists { get; set; }

    public virtual DbSet<TblDmcontractType> TblDmcontractTypes { get; set; }

    public virtual DbSet<TblDmcountry> TblDmcountries { get; set; }

    public virtual DbSet<TblDmcurrency> TblDmcurrencies { get; set; }

    public virtual DbSet<TblDmcustomer> TblDmcustomers { get; set; }

    public virtual DbSet<TblDmcustomerDanhGium> TblDmcustomerDanhGia { get; set; }

    public virtual DbSet<TblDmcustomerNghiepVu> TblDmcustomerNghiepVus { get; set; }

    public virtual DbSet<TblDmcustomerPhanLoaiKh> TblDmcustomerPhanLoaiKhs { get; set; }

    public virtual DbSet<TblDmcustomerTuyenHang> TblDmcustomerTuyenHangs { get; set; }

    public virtual DbSet<TblDmcustomerType> TblDmcustomerTypes { get; set; }

    public virtual DbSet<TblDmloaiDoanhNghiep> TblDmloaiDoanhNghieps { get; set; }

    public virtual DbSet<TblDmloaiHinhVanChuyen> TblDmloaiHinhVanChuyens { get; set; }

    public virtual DbSet<TblDmloaiNotification> TblDmloaiNotifications { get; set; }

    public virtual DbSet<TblDmloaiTacNghiep> TblDmloaiTacNghieps { get; set; }

    public virtual DbSet<TblDmnghiepVu> TblDmnghiepVus { get; set; }

    public virtual DbSet<TblDmphanLoaiKhachHang> TblDmphanLoaiKhachHangs { get; set; }

    public virtual DbSet<TblDmphongBan> TblDmphongBans { get; set; }

    public virtual DbSet<TblDmport> TblDmports { get; set; }

    public virtual DbSet<TblDmvanPhong> TblDmvanPhongs { get; set; }

    public virtual DbSet<TblDmxepLoaiBaoCaoCv> TblDmxepLoaiBaoCaoCvs { get; set; }

    public virtual DbSet<TblJobdocument> TblJobdocuments { get; set; }

    public virtual DbSet<TblJobnotification> TblJobnotifications { get; set; }

    public virtual DbSet<TblJobuserAccess> TblJobuserAccesses { get; set; }

    public virtual DbSet<TblJobuserPheDuyet> TblJobuserPheDuyets { get; set; }

    public virtual DbSet<TblNhanSu> TblNhanSus { get; set; }

    public virtual DbSet<TblNhanSuTreelist> TblNhanSuTreelists { get; set; }

    public virtual DbSet<TblNotification> TblNotifications { get; set; }

    public virtual DbSet<TblSysCode> TblSysCodes { get; set; }

    public virtual DbSet<TblSysCodeKey> TblSysCodeKeys { get; set; }

    public virtual DbSet<TblSysCodeKyHieu> TblSysCodeKyHieus { get; set; }

    public virtual DbSet<TblSysConfig> TblSysConfigs { get; set; }

    public virtual DbSet<TblSysFcmtoken> TblSysFcmtokens { get; set; }

    public virtual DbSet<TblSysOption> TblSysOptions { get; set; }

    public virtual DbSet<TblSysUser> TblSysUsers { get; set; }

    public virtual DbSet<TblSysUserGroup> TblSysUserGroups { get; set; }

    public virtual DbSet<TblSysUserNotification> TblSysUserNotifications { get; set; }

    public virtual DbSet<TblSysUserRelationGroup> TblSysUserRelationGroups { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=dbdev.namanphu.vn;Initial Catalog=BestCare_DB;User ID=notification_user;Password=123456a$;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblBaoCaoCongViec>(entity =>
        {
            entity.HasOne(d => d.IdnhanVienNavigation).WithMany(p => p.TblBaoCaoCongViecs).HasConstraintName("FK_tblBaoCaoCongViec_tblNhanSu");

            entity.HasOne(d => d.IduserCreateNavigation).WithMany(p => p.TblBaoCaoCongViecs).HasConstraintName("FK_tblBaoCaoCongViec_tblSysUser");

            entity.HasOne(d => d.IdxepLoaiNavigation).WithMany(p => p.TblBaoCaoCongViecs).HasConstraintName("FK_tblBaoCaoCongViec_tblDMXepLoaiBaoCaoCV");
        });

        modelBuilder.Entity<TblCustomerListImEx>(entity =>
        {
            entity.HasOne(d => d.IddmcustomerNavigation).WithMany(p => p.TblCustomerListImExes).HasConstraintName("FK_tblCustomerListImEx_tblDMCustomer");

            entity.HasOne(d => d.IdfromCountryNavigation).WithMany(p => p.TblCustomerListImExIdfromCountryNavigations).HasConstraintName("FK_tblCustomerListImEx_tblDMCountry1");

            entity.HasOne(d => d.IdfromPortNavigation).WithMany(p => p.TblCustomerListImExIdfromPortNavigations).HasConstraintName("FK_tblCustomerListImEx_tblDMPort1");

            entity.HasOne(d => d.IdtoCountryNavigation).WithMany(p => p.TblCustomerListImExIdtoCountryNavigations).HasConstraintName("FK_tblCustomerListImEx_tblDMCountry");

            entity.HasOne(d => d.IdtoPortNavigation).WithMany(p => p.TblCustomerListImExIdtoPortNavigations).HasConstraintName("FK_tblCustomerListImEx_tblDMPort");

            entity.HasOne(d => d.IduserCreateNavigation).WithMany(p => p.TblCustomerListImExes).HasConstraintName("FK_tblCustomerListImEx_tblSysUser");
        });

        modelBuilder.Entity<TblCustomerTacNghiep>(entity =>
        {
            entity.HasOne(d => d.IddmcustomerNavigation).WithMany(p => p.TblCustomerTacNghieps).HasConstraintName("FK_tblCustomerTacNghiep_tblDMCustomer");

            entity.HasOne(d => d.IdloaiTacNghiepNavigation).WithMany(p => p.TblCustomerTacNghieps).HasConstraintName("FK_tblCustomerTacNghiep_tblDMLoaiTacNghiep");

            entity.HasOne(d => d.IdnguoiLienHeNavigation).WithMany(p => p.TblCustomerTacNghieps).HasConstraintName("FK_tblCustomerTacNghiep_tblDMContactList");

            entity.HasOne(d => d.IduserCreateNavigation).WithMany(p => p.TblCustomerTacNghieps).HasConstraintName("FK_tblCustomerTacNghiep_tblSysUser");
        });

        modelBuilder.Entity<TblDmbankAccount>(entity =>
        {
            entity.HasOne(d => d.IdbankNavigation).WithMany(p => p.TblDmbankAccounts).HasConstraintName("FK_tblDMBankAccount_tblDMBank");

            entity.HasOne(d => d.IdcurrencyNavigation).WithMany(p => p.TblDmbankAccounts).HasConstraintName("FK_tblDMBankAccount_tblDMCurrency");

            entity.HasOne(d => d.IdvanPhongNavigation).WithMany(p => p.TblDmbankAccounts).HasConstraintName("FK_tblDMBankAccount_tblDMVanPhong");
        });

        modelBuilder.Entity<TblDmchucVu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_EnumChucVu");
        });

        modelBuilder.Entity<TblDmcity>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_tblCity");

            entity.Property(e => e.Note).IsFixedLength();

            entity.HasOne(d => d.IdquocGiaNavigation).WithMany(p => p.TblDmcities).HasConstraintName("FK_tblCity_tblQuocGia");
        });

        modelBuilder.Entity<TblDmcontactList>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_tblDMNguoiLienHe");

            entity.HasOne(d => d.IdbankNavigation).WithMany(p => p.TblDmcontactLists).HasConstraintName("FK_tblDMContactList_tblDMBank");

            entity.HasOne(d => d.IdcontactFunNavigation).WithMany(p => p.TblDmcontactLists).HasConstraintName("FK_tblDMNguoiLienHe_tblDMContactFun");

            entity.HasOne(d => d.IdcustomerNavigation).WithMany(p => p.TblDmcontactLists).HasConstraintName("FK_tblDMContactList_tblDMCustomer");

            entity.HasOne(d => d.IdportNavigation).WithMany(p => p.TblDmcontactLists).HasConstraintName("FK_tblDMContactList_tblDMPort");
        });

        modelBuilder.Entity<TblDmcontractType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_EnumHinhThucHopDong");
        });

        modelBuilder.Entity<TblDmcountry>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_tblQuocGia");
        });

        modelBuilder.Entity<TblDmcurrency>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_tblEnumCurrency");

            entity.Property(e => e.Code).IsFixedLength();
        });

        modelBuilder.Entity<TblDmcustomer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_tblDMKhachHang");

            entity.HasOne(d => d.IdbankNavigation).WithMany(p => p.TblDmcustomers).HasConstraintName("FK_tblDMCustomer_tblDMBank");

            entity.HasOne(d => d.IdcityNavigation).WithMany(p => p.TblDmcustomers).HasConstraintName("FK_tblDMCustomer_tblDMCity");

            entity.HasOne(d => d.IdloaiDoanhNghiepNavigation).WithMany(p => p.TblDmcustomers).HasConstraintName("FK_tblDMCustomer_tblDMLoaiDoanhNghiep");

            entity.HasOne(d => d.IdnhanVienSaleNavigation).WithMany(p => p.TblDmcustomers).HasConstraintName("FK_tblDMCustomer_tblNhanSu");

            entity.HasOne(d => d.IdquocGiaNavigation).WithMany(p => p.TblDmcustomers).HasConstraintName("FK_tblDMKhachHang_tblDMQuocGia");

            entity.HasOne(d => d.IduserCreateNavigation).WithMany(p => p.TblDmcustomerIduserCreateNavigations).HasConstraintName("FK_tblDMCustomer_tblSysUser");

            entity.HasOne(d => d.IduserDeleteNavigation).WithMany(p => p.TblDmcustomerIduserDeleteNavigations).HasConstraintName("FK_tblDMCustomer_tblSysUser1");

            entity.HasOne(d => d.IduserGiaoViecNavigation).WithMany(p => p.TblDmcustomerIduserGiaoViecNavigations).HasConstraintName("FK_tblDMCustomer_tblSysUser2");

            entity.HasOne(d => d.IduserTraKhachNavigation).WithMany(p => p.TblDmcustomerIduserTraKhachNavigations).HasConstraintName("FK_tblDMCustomer_tblSysUser3");
        });

        modelBuilder.Entity<TblDmcustomerDanhGium>(entity =>
        {
            entity.HasOne(d => d.IddmcustomerNavigation).WithMany(p => p.TblDmcustomerDanhGia).HasConstraintName("FK_tblDMCustomerDanhGia_tblDMCustomer");

            entity.HasOne(d => d.IddmcustomerTypeNavigation).WithMany(p => p.TblDmcustomerDanhGia).HasConstraintName("FK_tblDMCustomerDanhGia_tblDMCustomerType");

            entity.HasOne(d => d.IduserCreateNavigation).WithMany(p => p.TblDmcustomerDanhGia).HasConstraintName("FK_tblDMCustomerDanhGia_tblSysUser");
        });

        modelBuilder.Entity<TblDmcustomerNghiepVu>(entity =>
        {
            entity.HasOne(d => d.IddmcustomerNavigation).WithMany(p => p.TblDmcustomerNghiepVus).HasConstraintName("FK_tblDMCustomerNghiepVu_tblDMCustomer");

            entity.HasOne(d => d.IddmnghiepVuNavigation).WithMany(p => p.TblDmcustomerNghiepVus).HasConstraintName("FK_tblDMCustomerNghiepVu_tblDMNghiepVu");
        });

        modelBuilder.Entity<TblDmcustomerPhanLoaiKh>(entity =>
        {
            entity.HasOne(d => d.IddmcustomerNavigation).WithMany(p => p.TblDmcustomerPhanLoaiKhs).HasConstraintName("FK_tblDMCustomerPhanLoaiKH_tblDMCustomer");

            entity.HasOne(d => d.IddmphanLoaiKhachHangNavigation).WithMany(p => p.TblDmcustomerPhanLoaiKhs).HasConstraintName("FK_tblDMCustomerPhanLoaiKH_tblDMPhanLoaiKhachHang");
        });

        modelBuilder.Entity<TblDmcustomerTuyenHang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Table_1_1");

            entity.HasOne(d => d.IdcangDenNavigation).WithMany(p => p.TblDmcustomerTuyenHangIdcangDenNavigations).HasConstraintName("FK_tblTuyenDuong_tblDMPort1");

            entity.HasOne(d => d.IdcangDiNavigation).WithMany(p => p.TblDmcustomerTuyenHangIdcangDiNavigations).HasConstraintName("FK_tblTuyenDuong_tblDMPort");

            entity.HasOne(d => d.IddmcustomerNavigation).WithMany(p => p.TblDmcustomerTuyenHangs).HasConstraintName("FK_tblTuyenDuong_tblDMCustomer");

            entity.HasOne(d => d.IddmloaiHinhVanChuyenNavigation).WithMany(p => p.TblDmcustomerTuyenHangs).HasConstraintName("FK_tblDMCustomerTuyenHang_tblDMLoaiHinhVanChuyen");

            entity.HasOne(d => d.IdquocGiaDenNavigation).WithMany(p => p.TblDmcustomerTuyenHangIdquocGiaDenNavigations).HasConstraintName("FK_tblTuyenDuong_tblDMCountry1");

            entity.HasOne(d => d.IdquocGiaDiNavigation).WithMany(p => p.TblDmcustomerTuyenHangIdquocGiaDiNavigations).HasConstraintName("FK_tblTuyenDuong_tblDMCountry");
        });

        modelBuilder.Entity<TblDmphongBan>(entity =>
        {
            entity.HasOne(d => d.IddmvanPhongNavigation).WithMany(p => p.TblDmphongBans).HasConstraintName("FK_tblDMPhongBan_tblDMVanPhong");
        });

        modelBuilder.Entity<TblDmport>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_tblDMCang");

            entity.HasOne(d => d.IdbankNavigation).WithMany(p => p.TblDmports).HasConstraintName("FK_tblDMPort_tblDMBank");

            entity.HasOne(d => d.IdcityNavigation).WithMany(p => p.TblDmports).HasConstraintName("FK_tblDMCang_tblDMCity");

            entity.HasOne(d => d.IdquocGiaNavigation).WithMany(p => p.TblDmports).HasConstraintName("FK_tblDMPort_tblDMCountry");
        });

        modelBuilder.Entity<TblDmvanPhong>(entity =>
        {
            entity.HasOne(d => d.IdcityNavigation).WithMany(p => p.TblDmvanPhongs).HasConstraintName("FK_tblDMVanPhong_tblDMCity");

            entity.HasOne(d => d.IdcontactNavigation).WithMany(p => p.TblDmvanPhongIdcontactNavigations).HasConstraintName("FK_tblDMVanPhong_tblNhanSu2");

            entity.HasOne(d => d.IdcountryNavigation).WithMany(p => p.TblDmvanPhongs).HasConstraintName("FK_tblDMVanPhong_tblDMCountry");

            entity.HasOne(d => d.IdcurrencyNavigation).WithMany(p => p.TblDmvanPhongs).HasConstraintName("FK_tblDMVanPhong_tblDMCurrency");

            entity.HasOne(d => d.IdkeToanTruongNavigation).WithMany(p => p.TblDmvanPhongIdkeToanTruongNavigations).HasConstraintName("FK_tblDMVanPhong_tblNhanSu1");
        });

        modelBuilder.Entity<TblJobdocument>(entity =>
        {
            entity.HasOne(d => d.IduserUploadNavigation).WithMany(p => p.TblJobdocuments).HasConstraintName("FK_tblJOBDocument_tblSysUser");
        });

        modelBuilder.Entity<TblJobuserAccess>(entity =>
        {
            entity.HasOne(d => d.IduserNavigation).WithMany(p => p.TblJobuserAccesses).HasConstraintName("FK_tblJOBUserAccess_tblSysUser");

            entity.HasOne(d => d.IduserGroupNavigation).WithMany(p => p.TblJobuserAccesses).HasConstraintName("FK_tblJOBUserAccess_tblSysUserGroup");
        });

        modelBuilder.Entity<TblJobuserPheDuyet>(entity =>
        {
            entity.HasOne(d => d.IduserPheDuyetNavigation).WithMany(p => p.TblJobuserPheDuyets).HasConstraintName("FK_tblJOBUserPheDuyet_tblSysUser");
        });

        modelBuilder.Entity<TblNhanSu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_tblNhanSu_1");

            entity.Property(e => e.GioiTinh).HasDefaultValue(0);

            entity.HasOne(d => d.IdchucVuNavigation).WithMany(p => p.TblNhanSus).HasConstraintName("FK_tblNhanSu_tblDMChucVu");

            entity.HasOne(d => d.IdphongBanNavigation).WithMany(p => p.TblNhanSus).HasConstraintName("FK_tblNhanSu_tblDMPhongBan");

            entity.HasOne(d => d.IdvanPhongNavigation).WithMany(p => p.TblNhanSus).HasConstraintName("FK_tblNhanSu_tblDMVanPhong");
        });

        modelBuilder.Entity<TblNhanSuTreelist>(entity =>
        {
            entity.HasOne(d => d.IdnhanVienNavigation).WithMany(p => p.TblNhanSuTreelists).HasConstraintName("FK_tblNhanSuTreelist_tblNhanSu");
        });

        modelBuilder.Entity<TblNotification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_tblNotification_1");

            entity.ToTable("tblNotification", tb => tb.HasTrigger("tgNotification_Insert"));
        });

        modelBuilder.Entity<TblSysCode>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_tblSysOptionCongViec");
        });

        modelBuilder.Entity<TblSysCodeKey>(entity =>
        {
            entity.Property(e => e.Format).IsFixedLength();
            entity.Property(e => e.KeyCode).IsFixedLength();

            entity.HasOne(d => d.IdsysCodeNavigation).WithMany(p => p.TblSysCodeKeys).HasConstraintName("FK_tblSysCodeKey_tblSysCode");
        });

        modelBuilder.Entity<TblSysCodeKyHieu>(entity =>
        {
            entity.HasOne(d => d.IdsysCodeNavigation).WithMany(p => p.TblSysCodeKyHieus).HasConstraintName("FK_tblSysCodeKyHieu_tblSysCode");
        });

        modelBuilder.Entity<TblSysFcmtoken>(entity =>
        {
            entity.HasOne(d => d.User).WithMany(p => p.TblSysFcmtokens).HasConstraintName("FK_tblSysFCMToken_tblNhanSu");
        });

        modelBuilder.Entity<TblSysOption>(entity =>
        {
            entity.Property(e => e.Language).HasDefaultValue(0);
        });

        modelBuilder.Entity<TblSysUser>(entity =>
        {
            entity.Property(e => e.Active).HasDefaultValue(false);

            entity.HasOne(d => d.IdgroupUserNavigation).WithMany(p => p.TblSysUsers).HasConstraintName("FK_tblSysUser_tblSysUserGroup");

            entity.HasOne(d => d.IdnhanVienNavigation).WithMany(p => p.TblSysUsers).HasConstraintName("FK_tblSysUser_tblNhanSu");
        });

        modelBuilder.Entity<TblSysUserNotification>(entity =>
        {
            entity.HasOne(d => d.IduserNavigation).WithMany(p => p.TblSysUserNotifications).HasConstraintName("FK_tblSysUserNotification_tblSysUser");
        });

        modelBuilder.Entity<TblSysUserRelationGroup>(entity =>
        {
            entity.HasOne(d => d.IdgroupNavigation).WithMany(p => p.TblSysUserRelationGroups).HasConstraintName("FK_tblSysUserRelationGroup_tblSysUserGroup");

            entity.HasOne(d => d.IduserNavigation).WithMany(p => p.TblSysUserRelationGroups).HasConstraintName("FK_tblSysUserRelationGroup_tblSysUser");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
