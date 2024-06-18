using Repositories.DataModels;
using Repositories.Interface;
using Services.Dtos;
using Services.Interface;

namespace Services.Implementation
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IFoodRepository _foodRepository;

        public CartService(ICartRepository cartRepository, IFoodRepository foodRepository)
        {
            _cartRepository = cartRepository;
            _foodRepository = foodRepository;
        }

        public List<FoodDto> GetFoodDtos()
        {
            // Func<FoodList, bool> foodPredicate = (a =>
            //     (filterDto.SearchElement == null || a.Name.ToLower().Contains(filterDto.SearchElement.ToLower()))
            //     && (filterDto.IsVeg == null || a.IsVeg == filterDto.IsVeg));
            return _foodRepository.GetFoodLists().Select(foodList => new FoodDto()
            {
                Name = foodList.Name,
                FoodId = foodList.FoodId,
                Price = foodList.Price,
                IsVeg = foodList.IsVeg
            }).ToList();
        }

        public Task<bool> AddProductToCart(CartDto cartDto)
        {
            Cart? cart = _cartRepository.GetCartByUserIdAndFoodId(userId: cartDto.UserId, foodId: cartDto.FoodId);
            if (cart == null)
            {
                return _cartRepository.AddCart(new Cart()
                {
                    UserId = cartDto.UserId,
                    Count = cartDto.Count,
                    FoodId = cartDto.FoodId,
                });
            }
            else
            {
                cart.Count += cartDto.Count;
                return _cartRepository.UpdateCart(cart);
            }
        }

        public Task<bool> ChangeCart(int userId, int cartId, int newCount)
        {
            Cart? cart = _cartRepository.GetCart(userId: userId, cartId: cartId);
            cart.Count = newCount;
            return _cartRepository.UpdateCart(cart);
        }

        public Task<bool> DeleteCarts(int userId)
        {
            return _cartRepository.DeleteCart(userId);
        }
    }
}