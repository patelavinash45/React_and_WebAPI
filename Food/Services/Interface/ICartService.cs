using Services.Dtos;

public interface ICartService
{
    Task<bool> AddProductToCart(CartDto cartDto);

    Task<bool> ChangeCart(int userId, int cartId, int newCount);

    Task<bool> DeleteCarts(int userId);
}