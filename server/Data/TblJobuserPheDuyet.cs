using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblJOBUserPheDuyet")]
public partial class TblJobuserPheDuyet
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDUserPheDuyet")]
    public long? IduserPheDuyet { get; set; }

    [Column("IDPhieuThuChi")]
    public long? IdphieuThuChi { get; set; }

    [Column("IDJobAcoutingRequest")]
    public long? IdjobAcoutingRequest { get; set; }

    [Column("IDDeNghiTamUng")]
    public long? IddeNghiTamUng { get; set; }

    [Column("IDBooking")]
    public long? Idbooking { get; set; }

    [ForeignKey("IduserPheDuyet")]
    [InverseProperty("TblJobuserPheDuyets")]
    public virtual TblSysUser? IduserPheDuyetNavigation { get; set; }
}
