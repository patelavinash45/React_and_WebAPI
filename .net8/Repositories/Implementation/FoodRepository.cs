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

        public int CountFoodList(string? searchElement)
        {
            Func<FoodList, bool> foodPredicate = (a =>
                searchElement == null || a.Name.ToLower().Contains(searchElement.ToLower()));
            return _foodContext.FoodLists.Count(foodPredicate);
        }

        public List<FoodList> GetFoodLists(string? searchElement, bool lowToHigh, int skip, int pageSize)
        {
            Func<FoodList, bool> foodPredicate = (a =>
                searchElement == null || a.Name.ToLower().Contains(searchElement.ToLower()));
            var query = _foodContext.FoodLists.Where(foodPredicate).OrderBy(a => a.FoodId);
            if (lowToHigh)
            {
                return query.OrderBy(a => a.Price).Skip(skip).Take(pageSize).ToList();
            }
            else
            {
                return query.OrderByDescending(a => a.Price).Skip(skip).Take(pageSize).ToList();
            }
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

        public async Task<bool> UpdateFood(FoodList foodList)
        {
            _foodContext.FoodLists.Update(foodList);
            return await _foodContext.SaveChangesAsync() > 0;
        }
    }
}