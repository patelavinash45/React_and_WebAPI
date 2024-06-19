using Repositories.DataModels;

namespace Repositories.Interface
{
    public interface IFoodRepository
    {
        List<FoodList> GetFoodLists();

        FoodList? GetFood(int foodId);

        Task<int> AddFood(FoodList foodList);

        Task<bool> DeleteFood(FoodList foodList);
    }
}