using System;
using System.Collections.Generic;

namespace VslCrmApiRealTime.Data;

public partial class TblDmcustomerType
{
    public long Id { get; set; }

    public string? Code { get; set; }

    public string? NameVI { get; set; }

    public string? NameEN { get; set; }

    public virtual ICollection<TblDmcustomerDanhGium> TblDmcustomerDanhGia { get; set; } = new List<TblDmcustomerDanhGium>();
}
