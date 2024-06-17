using Repositories.DataModels;

namespace Repositories
{
    public interface IUserRepo
    {
        Task<User> GetUserByEmail(string email);
    }
}
