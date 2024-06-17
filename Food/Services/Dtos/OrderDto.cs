namespace FoodAPI.Dtos;

public class OrderDto{
    public required string Address { get; set; }

    public double TotalAmount { get; set; }

    public required List<OrderDetailsDto> OrderDetailsDtos { get; set; }
}

public class OrderDetailsDto{

    public int FoodId { get; set; }

    public int Count { get; set; }

    public double Amount { get; set; }
}