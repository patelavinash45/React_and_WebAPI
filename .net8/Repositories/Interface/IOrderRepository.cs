using Repositories.DataModels;

namespace Repositories.Interface
{
    public interface IOrderRepository
    {
        Task<bool> AddOrder(Order order);
    }
}