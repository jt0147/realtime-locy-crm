using System;
using System.Collections.Generic;

namespace VslCrmApiRealTime.Data;

public partial class TblNotifyWeb
{
    public long Id { get; set; }

    public long IduserGui { get; set; }

    public long IduserNhan { get; set; }

    public long? IduserLienQuan { get; set; }

    public long Iddmmess { get; set; }

    public bool? IsRead { get; set; }

    public DateTime? DateCreate { get; set; }

    public virtual TblNotifyWebMessage IddmmessNavigation { get; set; } = null!;

    public virtual TblSysUser IduserGuiNavigation { get; set; } = null!;

    public virtual TblSysUser? IduserLienQuanNavigation { get; set; }

    public virtual TblSysUser IduserNhanNavigation { get; set; } = null!;
}
