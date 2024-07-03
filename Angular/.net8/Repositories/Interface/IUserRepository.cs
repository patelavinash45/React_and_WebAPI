using Repositories.DataModels;

namespace Repositories.Interface
{
    public interface IUserRepository : IGenericRepository<User>
    {
        User? GetUser(string email);

        User? ValidateUser(string email, string password);
    }
}