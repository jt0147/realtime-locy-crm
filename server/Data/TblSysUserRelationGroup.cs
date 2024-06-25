using System;
using System.Collections.Generic;

namespace VslCrmApiRealTime.Data;

public partial class TblSysUserRelationGroup
{
    public long Id { get; set; }

    public long? Idgroup { get; set; }

    public long? Iduser { get; set; }

    public virtual TblSysUserGroup? IdgroupNavigation { get; set; }

    public virtual TblSysUser? IduserNavigation { get; set; }
}
