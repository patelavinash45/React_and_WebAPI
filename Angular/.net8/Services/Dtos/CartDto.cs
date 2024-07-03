namespace Services.Dtos;

public class CartDto
{
    public required int CartId { get; set; }

    public required int UserId { get; set; }

    public required int Count { get; set; }

    public required int FoodId { get; set; }
}