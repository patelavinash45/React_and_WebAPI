using FoodDbContext;
using Repositories.DataModels;

public class OrderRepository : IOrderRepository
{
    private readonly FoodContext _foodContext;
    public OrderRepository(FoodContext foodContext)
    {
        _foodContext = foodContext;
    }

    public async Task<bool> AddOrder(Order order)
    {
         _foodContext.Orders.Add(order);
        return await _foodContext.SaveChangesAsync() > 0;
    }
}