using Repositories.DataModels;

namespace Repositories.Interface
{
    public interface ICartRepository : IGenericRepository<Cart>
    {
        Cart? GetCartByUserIdAndFoodId(int userId, int foodId);

        Cart? GetCart(int userId, int cartId);
    }
}