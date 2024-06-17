using Repositories.DataModels;

public interface IUserRepository
{
    Task<int> AddUser(User user);

    User? GetUser(string email);

    User? ValidateUser(string email, string password);
}