namespace Services.Dtos;

public class CartDto
{
    public int CartId { get; set; }

    public int UserId { get; set; }

    public int Count { get; set; }

    public int FoodId { get; set; }
}