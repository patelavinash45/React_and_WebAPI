using FoodDbContext;
using Repositories.DataModels;
using Repositories.Interface;

namespace Repositories.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly FoodContext _foodContext;
        public UserRepository(FoodContext foodContext)
        {
            _foodContext = foodContext;
        }

        public async Task<int> AddUser(User user)
        {
            _foodContext.Users.Add(user);
            await _foodContext.SaveChangesAsync();
            return user?.UserId ?? 0;
        }

        public User? GetUser(string email)
        {
            return _foodContext.Users.FirstOrDefault(a => a.Email == email);
        }

        public User? ValidateUser(string email, string password)
        {
            return _foodContext.Users.FirstOrDefault(a => a.Email == email && a.Password == password);
        }
    }
}