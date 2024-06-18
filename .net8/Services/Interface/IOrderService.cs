using FoodAPI.Dtos;

namespace Services.Interface
{
    public interface IOrderService
    {
        Task<bool> AddOrder(OrderDto orderDto, int userId);
    }
}