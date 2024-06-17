using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repositories.DataModels;

[Table("Cart")]
public partial class Cart
{
    [Key]
    public int CartId { get; set; }

    public int UserId { get; set; }

    public int Count { get; set; }

    public int FoodId { get; set; }

    [ForeignKey("FoodId")]
    [InverseProperty("Carts")]
    public virtual FoodList? Food { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("Carts")]
    public virtual User? User { get; set; } = null!;
}
