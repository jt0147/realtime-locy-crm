using System;
using System.Collections.Generic;

namespace VslCrmApiRealTime.Data;

public partial class TblJobnotification
{
    public long Id { get; set; }

    public long? Idjob { get; set; }

    public long? Idobject { get; set; }

    public DateTime? NgayThongBao { get; set; }

    public bool? FlagTraTheoKy { get; set; }
}
