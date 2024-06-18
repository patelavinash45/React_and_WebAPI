namespace Services.Dtos;

public class FoodDto
{
    public required int FoodId { get; set; }

    public required bool? IsVeg { get; set; }

    public required string Name { get; set; }

    public required double Price { get; set; }
}