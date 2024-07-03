using Services.Dtos;

namespace Services.Interface
{
    public interface IFoodService
    {
        object GetFoodDtos(FilterDto filterDto, int pageNo, int pageSize);

        FoodDto? GetFood(int foodId);

        Task<int> AddFood(CreateFoodDto createFoodDto);

        Task<bool> DeleteFood(int foodId);

        Task<bool> UpdateFood(FoodDto foodDto, int foodId);
    }
}