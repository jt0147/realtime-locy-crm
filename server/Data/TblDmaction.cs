using System;
using System.Collections.Generic;

namespace VslCrmApiRealTime.Data;

public partial class TblDmaction
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public bool? FlagFavorite { get; set; }
}
