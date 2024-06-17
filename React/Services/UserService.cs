using Repositories;
using Repositories.DataModels;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepo _userRepo;

        public UserService(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        public async Task<bool> ValidateUser(UserView model)
        {
            User user = await _userRepo.GetUserByEmail(model.Email);
            if (user != null && user.Password == model.Password.Trim())
            {
                return true;
            }
            return false;
        }
    }
}
