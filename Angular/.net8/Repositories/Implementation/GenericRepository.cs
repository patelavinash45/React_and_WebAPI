using FoodDbContext;
using Repositories.Interface;

namespace Repositories.Implementation
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {

        private readonly FoodContext _foodContext;
        public GenericRepository(FoodContext foodContext)
        {
            _foodContext = foodContext;
        }

        public List<T> GetAll()
        {
            return _foodContext.Set<T>().ToList();
        }

        public T? GetById(int id)
        {
            return _foodContext.Set<T>().Find(id);
        }

        public async Task<bool> Add(T objModel)
        {
            _foodContext.Set<T>().Add(objModel);
            return await _foodContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(int id)
        {
            T? objModel = _foodContext.Set<T>().Find(id);
            if (objModel != null)
            {
                _foodContext.Set<T>().Remove(objModel);
                return await _foodContext.SaveChangesAsync() > 0;
            }
            return false;
        }

        public async Task<bool> Update(T objModel)
        {
            _foodContext.Set<T>().Update(objModel);
            return await _foodContext.SaveChangesAsync() > 0;
        }
    }
}