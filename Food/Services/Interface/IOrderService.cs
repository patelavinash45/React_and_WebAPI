using FoodAPI.Dtos;

public interface IOrderService
{
    Task<bool> AddOrder(OrderDto orderDto, int userId);
}