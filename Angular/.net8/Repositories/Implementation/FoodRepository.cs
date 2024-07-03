using FoodDbContext;
using Repositories.DataModels;
using Repositories.Interface;

namespace Repositories.Implementation
{
    public class FoodRepository : GenericRepository<FoodList>, IFoodRepository
    {
        private readonly FoodContext _foodContext;
        public FoodRepository(FoodContext foodContext) : base(foodContext)
        {
            _foodContext = foodContext;
        }

        public int CountFoodList(string? searchElement)
        {
            Func<FoodList, bool> foodPredicate = (a =>
                searchElement == null || a.Name.ToLower().Contains(searchElement.ToLower()));
            return _foodContext.FoodLists.Count(foodPredicate);
        }

        public List<FoodList> GetFoodLists(string? searchElement, bool lowToHigh, int foodType, int skip, int pageSize)
        {
            Func<FoodList, bool> foodPredicate = (a =>
                (searchElement == null || a.Name.ToLower().Contains(searchElement.ToLower()))
                && (foodType == 0
                || (foodType == 1 && a.IsVeg == true)
                || (foodType == 2 && a.IsVeg == false)));
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
    }
}