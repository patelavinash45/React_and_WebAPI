using FoodDbContext;
using Repositories.DataModels;
using Repositories.Interface;

namespace Repositories.Implementation
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        private readonly FoodContext _foodContext;
        public OrderRepository(FoodContext foodContext) : base(foodContext)
        {
            _foodContext = foodContext;
        }
    }
}