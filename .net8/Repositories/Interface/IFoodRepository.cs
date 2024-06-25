using Repositories.DataModels;

namespace Repositories.Interface
{
    public interface IFoodRepository
    {
        int CountFoodList(string? searchElement);

        List<FoodList> GetFoodLists(string? searchElement, bool lowToHigh, int skip, int pageSize);

        FoodList? GetFood(int foodId);

        Task<int> AddFood(FoodList foodList);

        Task<bool> DeleteFood(FoodList foodList);

        Task<bool> UpdateFood(FoodList foodList);
    }
}