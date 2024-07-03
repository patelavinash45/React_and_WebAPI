using Repositories.DataModels;
using Repositories.Interface;
using Services.Dtos;
using Services.Interface;

namespace Services.Implementation
{
    public class FoodService : IFoodService
    {
        private readonly IFoodRepository _foodRepository;

        public FoodService(IFoodRepository foodRepository)
        {
            _foodRepository = foodRepository;
        }

        public async Task<int> AddFood(CreateFoodDto createFoodDto)
        {
            var objModel = new FoodList()
            {
                Name = createFoodDto.Name,
                IsVeg = createFoodDto.IsVeg,
                Price = createFoodDto.Price,
            };
            bool result = await _foodRepository.Add(objModel);
            return result ? objModel.FoodId : 0;
        }

        public async Task<bool> DeleteFood(int foodId)
        {
            return await _foodRepository.Delete(foodId);
        }

        public FoodDto? GetFood(int foodId)
        {
            FoodList? foodList = _foodRepository.GetById(foodId);
            if (foodList != null)
            {
                return new FoodDto
                {
                    FoodId = foodList.FoodId,
                    Name = foodList.Name,
                    IsVeg = foodList.IsVeg,
                    Price = foodList.Price,
                };
            }
            return null;
        }

        public object GetFoodDtos(FilterDto filterDto, int pageNo, int pageSize)
        {
            int skip = (pageNo - 1) * pageSize;
            int foodType = 0;
            switch (filterDto.FoodType)
            {
                case FoodType.Veg: foodType = 1; break;
                case FoodType.NonVeg: foodType = 2; break;
            }
            List<FoodDto> foodDtos = _foodRepository.GetFoodLists(filterDto.SearchElement, filterDto.LowToHigh, foodType, skip, pageSize)
            .Select(foodList => new FoodDto()
            {
                Name = foodList.Name,
                FoodId = foodList.FoodId,
                Price = foodList.Price,
                IsVeg = foodList.IsVeg
            }).ToList();
            int totalItems = _foodRepository.CountFoodList(filterDto.SearchElement);
            int totalPages = (totalItems + pageSize - 1) / pageSize;
            return new
            {
                TotalItems = totalItems,
                Records = foodDtos,
                CurrentPageNo = pageNo,
                PageSize = pageSize,
                isNext = totalPages > pageNo,
                isPrevious = pageNo != 1
            };
        }

        public async Task<bool> UpdateFood(FoodDto foodDto, int foodId)
        {
            FoodList? foodList = _foodRepository.GetById(foodId);
            if (foodList != null)
            {
                foodList.Name = foodDto.Name;
                foodList.IsVeg = foodDto.IsVeg;
                foodList.Price = foodDto.Price;
                return await _foodRepository.Update(foodList);
            }
            return false;
        }
    }
}