using Repositories.DataModels;
using Repositories.Interface;
using Services.Dtos;
using Services.Interface;

namespace Services.Implementation
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;

        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        } 

        public Task<bool> AddProductToCart(CartDto cartDto)
        {
            Cart? cart = _cartRepository.GetCartByUserIdAndFoodId(userId: cartDto.UserId, foodId: cartDto.FoodId);
            if (cart == null)
            {
                return _cartRepository.Add(new Cart()
                {
                    UserId = cartDto.UserId,
                    Count = cartDto.Count,
                    FoodId = cartDto.FoodId,
                });
            }
            else
            {
                cart.Count += cartDto.Count;
                return _cartRepository.Update(cart);
            }
        }

        public Task<bool> ChangeCart(int userId, int cartId, int newCount)
        {
            Cart? cart = _cartRepository.GetCart(userId: userId, cartId: cartId);
            cart!.Count = newCount;
            return _cartRepository.Update(cart);
        }

        public Task<bool> DeleteCarts(int userId)
        {
            return _cartRepository.Delete(userId);
        }
    }
}