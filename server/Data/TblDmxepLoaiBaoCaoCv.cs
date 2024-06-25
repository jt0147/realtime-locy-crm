﻿using System;
using System.Collections.Generic;

namespace VslCrmApiRealTime.Data;

public partial class TblDmxepLoaiBaoCaoCv
{
    public long Id { get; set; }

    public string? TenLoai { get; set; }

    public string? GhiChu { get; set; }

    public bool? FlagFavorite { get; set; }

    public virtual ICollection<TblBaoCaoCongViec> TblBaoCaoCongViecs { get; set; } = new List<TblBaoCaoCongViec>();
}
