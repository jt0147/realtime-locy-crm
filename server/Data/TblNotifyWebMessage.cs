using System;
using System.Collections.Generic;

namespace VslCrmApiRealTime.Data;

public partial class TblNotifyWebMessage
{
    public long Id { get; set; }

    public string? MessageSender { get; set; }

    public string? MessageReceiver { get; set; }

    public string? MessageRelated { get; set; }

    public virtual ICollection<TblNotifyWeb> TblNotifyWebs { get; set; } = new List<TblNotifyWeb>();
}
