
namespace Repositories.Interface
{
    public interface IGenericRepository<T> where T : class
    {
        List<T> GetAll();

        T? GetById(int id);

        Task<bool> Add(T objModel);

        Task<bool> Delete(int id);

        Task<bool> Update(T objModel);
    }
}