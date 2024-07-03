using Repositories.DataModels;

namespace Repositories.Interface
{
    public interface IFoodRepository : IGenericRepository<FoodList> 
    {
        int CountFoodList(string? searchElement);

        List<FoodList> GetFoodLists(string? searchElement, bool lowToHigh, int foodType, int skip, int pageSize);
    }
}