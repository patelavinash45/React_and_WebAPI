using Repositories.DataModels;

public interface ICartRepository
{
    Task<bool> AddCart(Cart cart);

    Task<bool> UpdateCart(Cart cart);

    Cart? GetCartByUserIdAndFoodId(int userId, int foodId);

    Cart? GetCart(int userId, int cartId);

    Task<bool> DeleteCart(int userId);
}