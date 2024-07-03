using FoodDbContext;
using Repositories.DataModels;
using Repositories.Interface;

namespace Repositories.Implementation
{
    public class CartRepository : GenericRepository<Cart>, ICartRepository
    {
        private readonly FoodContext _foodContext;
        public CartRepository(FoodContext foodContext) : base(foodContext)
        {
            _foodContext = foodContext;
        }

        public Cart? GetCartByUserIdAndFoodId(int userId, int foodId)
        {
            return _foodContext.Carts.FirstOrDefault(a => a.UserId == userId && a.FoodId == foodId);
        }

        public Cart? GetCart(int userId, int cartId)
        {
            return _foodContext.Carts.FirstOrDefault(a => a.UserId == userId && a.CartId == cartId);
        }
    }
}