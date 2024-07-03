namespace FoodAPI.Dtos;

public class OrderDto{
    public required string Address { get; set; }

    public double TotalAmount { get; set; }

    public required List<OrderDetailsDto> OrderDetailsDtos { get; set; }
}

public class OrderDetailsDto{

    public required int FoodId { get; set; }

    public required int Count { get; set; }

    public required double Amount { get; set; }
}