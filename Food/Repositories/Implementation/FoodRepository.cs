using FoodDbContext;
using Repositories.DataModels;
using Repositories.Interface;

namespace Repositories.Implementation
{
    public class FoodRepository : IFoodRepository
    {
        private readonly FoodContext _foodContext;
        public FoodRepository(FoodContext foodContext)
        {
            _foodContext = foodContext;
        }

        public List<FoodList> GetFoodLists()
        {
            return _foodContext.FoodLists.ToList();
        }
    }
}