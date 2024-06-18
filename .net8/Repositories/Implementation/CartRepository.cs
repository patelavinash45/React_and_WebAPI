using FoodDbContext;
using Repositories.DataModels;
using Repositories.Interface;

namespace Repositories.Implementation
{
    public class CartRepository : ICartRepository
    {
        private readonly FoodContext _foodContext;
        public CartRepository(FoodContext foodContext)
        {
            _foodContext = foodContext;
        }

        public async Task<bool> AddCart(Cart cart)
        {
            _foodContext.Carts.Add(cart);
            return await _foodContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateCart(Cart cart)
        {
            _foodContext.Carts.Add(cart);
            return await _foodContext.SaveChangesAsync() > 0;
        }

        public Cart? GetCartByUserIdAndFoodId(int userId, int foodId)
        {
            return _foodContext.Carts.FirstOrDefault(a => a.UserId == userId && a.FoodId == foodId);
        }

        public Cart? GetCart(int userId, int cartId)
        {
            return _foodContext.Carts.FirstOrDefault(a => a.UserId == userId && a.CartId == cartId);
        }

        public async Task<bool> DeleteCart(int userId)
        {
            _foodContext.Carts.RemoveRange(_foodContext.Carts.Where(a => a.UserId == userId).ToList());
            return await _foodContext.SaveChangesAsync() > 0;
        }
    }
}