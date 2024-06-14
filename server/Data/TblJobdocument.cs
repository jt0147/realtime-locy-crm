using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace VslCrmApiRealTime.Data;

[Table("tblJOBDocument")]
public partial class TblJobdocument
{
    [Key]
    [Column("ID")]
    public long Id { get; set; }

    [Column("IDJOB")]
    public long? Idjob { get; set; }

    [Column("IDDMToDo")]
    public long? IddmtoDo { get; set; }

    [Column("IDUserUpload")]
    public long? IduserUpload { get; set; }

    [Column("IDJOBTodo")]
    public long? Idjobtodo { get; set; }

    public int? EnumDocumentType { get; set; }

    public int? EnumReportUse { get; set; }

    [StringLength(250)]
    public string? Path { get; set; }

    public string? FileName { get; set; }

    [StringLength(250)]
    public string? Description { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreateDate { get; set; }

    [Column("IDTheoDoiVanChuyen")]
    public long? IdtheoDoiVanChuyen { get; set; }

    [Column("IDRequest")]
    public long? Idrequest { get; set; }

    [Column("IDDieuPhoi")]
    public long? IddieuPhoi { get; set; }

    public int? EnumAttachType { get; set; }

    public bool? FlagCategory { get; set; }

    [Column("IDBooking")]
    public long? Idbooking { get; set; }

    [Column("FlagRPT")]
    public bool? FlagRpt { get; set; }

    public int? EnumTypeOfTransport { get; set; }

    [Column("EnumLCLFCl")]
    public int? EnumLclfcl { get; set; }

    public int? EnumDocument { get; set; }

    [ForeignKey("IduserUpload")]
    [InverseProperty("TblJobdocuments")]
    public virtual TblSysUser? IduserUploadNavigation { get; set; }
}
