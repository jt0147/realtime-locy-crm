using System;
using System.Collections.Generic;

namespace VslCrmApiRealTime.Data;

public partial class TblNhanSuTreelist
{
    public long Id { get; set; }

    public long? ParentId { get; set; }

    public string? NameGroup { get; set; }

    public long? IdnhanVien { get; set; }

    public bool? FlagViewAllGroup { get; set; }

    public virtual TblNhanSu? IdnhanVienNavigation { get; set; }
}
