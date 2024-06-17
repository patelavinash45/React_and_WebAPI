namespace Services.Dtos;

public class FoodDto
{
    public int FoodId { get; set; }

    public bool? IsVeg { get; set; }

    public string Name { get; set; }

    public double Price { get; set; }
}