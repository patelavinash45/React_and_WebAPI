using FoodDbContext;
using Repositories.DataModels;
using Repositories.Interface;

namespace Repositories.Implementation
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly FoodContext _foodContext;
        public UserRepository(FoodContext foodContext) : base(foodContext)
        {
            _foodContext = foodContext;
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