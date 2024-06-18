using Repositories.DataModels;

namespace Repositories.Interface
{
    public interface IFoodRepository
    {
        List<FoodList> GetFoodLists();
    }
}