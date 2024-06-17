using Repositories.DataModels;

public interface IOrderRepository
{
    Task<bool> AddOrder(Order order);
}