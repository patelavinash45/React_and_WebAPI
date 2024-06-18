using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Repositories.DataModels;

public partial class OrderDetail
{
    [Key]
    public int OrderDetailsId { get; set; }

    public int OrderId { get; set; }

    public int FoodId { get; set; }

    public int Count { get; set; }

    public double Amount { get; set; }

    [ForeignKey("FoodId")]
    [InverseProperty("OrderDetails")]
    public virtual FoodList Food { get; set; } = null!;

    [ForeignKey("OrderId")]
    [InverseProperty("OrderDetails")]
    public virtual Order Order { get; set; } = null!;
}
