using System;
using System.Collections.Generic;

namespace VslCrmApiRealTime.Data;

public partial class TblJobuserAccess
{
    public long Id { get; set; }

    public long? Idjob { get; set; }

    public long? Iduser { get; set; }

    public long? IduserGroup { get; set; }

    public long? Idbooking { get; set; }

    public long? IdjobbaoGia { get; set; }

    public long? Idjoborder { get; set; }

    public virtual TblSysUserGroup? IduserGroupNavigation { get; set; }

    public virtual TblSysUser? IduserNavigation { get; set; }
}
