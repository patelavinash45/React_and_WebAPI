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

        public FoodList? GetFood(int foodId)
        {
            return _foodContext.FoodLists.FirstOrDefault(a => a.FoodId == foodId);
        }

        public async Task<int> AddFood(FoodList foodList)
        {
            _foodContext.FoodLists.Add(foodList);
            await _foodContext.SaveChangesAsync();
            return foodList?.FoodId ?? 0;
        }

        public async Task<bool> DeleteFood(FoodList foodList)
        {
            _foodContext.FoodLists.Remove(foodList);
            return await _foodContext.SaveChangesAsync() > 0;
        }
    }
}