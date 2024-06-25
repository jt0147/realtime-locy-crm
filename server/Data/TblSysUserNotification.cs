using System;
using System.Collections.Generic;

namespace VslCrmApiRealTime.Data;

public partial class TblSysUserNotification
{
    public long Id { get; set; }

    public long? Iduser { get; set; }

    public bool? FlagNewJob { get; set; }

    public bool? FlagDebit { get; set; }

    public virtual TblSysUser? IduserNavigation { get; set; }
}
