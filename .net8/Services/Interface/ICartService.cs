using Services.Dtos;

namespace Services.Interface
{
    public interface ICartService
    {
        object GetFoodDtos(FilterDto filterDto, int pageNo, int pageSize);

        Task<bool> AddProductToCart(CartDto cartDto);

        Task<bool> ChangeCart(int userId, int cartId, int newCount);

        Task<bool> DeleteCarts(int userId);

        FoodDto? GetFood(int foodId);

        Task<int> AddFood(CreateFoodDto createFoodDto);

        Task<bool> DeleteFood(int foodId);

        Task<bool> UpdateFood(FoodDto foodDto, int foodId);
    }
}