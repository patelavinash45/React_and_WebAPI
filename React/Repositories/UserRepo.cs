using Microsoft.EntityFrameworkCore;
using Repositories.DataModels;
using Repositories.DbContect;

namespace Repositories
{
    public class UserRepo : IUserRepo
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public UserRepo(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _applicationDbContext.Users.FirstOrDefaultAsync(m => m.Email == email.Trim());
        }
    }
}
