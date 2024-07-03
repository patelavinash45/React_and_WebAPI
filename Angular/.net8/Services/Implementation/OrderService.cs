using FoodAPI.Dtos;
using Repositories.DataModels;
using Repositories.Interface;
using Services.Interface;

namespace Services.Implementation
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public Task<bool> AddOrder(OrderDto orderDto, int userId)
        {
            return _orderRepository.Add(new Order()
            {
                UserId = userId,
                Date = DateTime.Now,
                Address = orderDto.Address,
                OrderDetails = orderDto.OrderDetailsDtos.Select(
                            orderDto => new OrderDetail()
                            {
                                FoodId = orderDto.FoodId,
                                Count = orderDto.Count,
                                Amount = orderDto.Amount,
                            }).ToList(),
            });
        }
    }
}