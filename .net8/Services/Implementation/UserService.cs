using Repositories.DataModels;
using Repositories.Interface;
using Services.Dtos;
using Services.Interface;

namespace Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<JwtUserDto?> AddUser(CreateUserDto createUserDto)
        {
            User? user = _userRepository.GetUser(createUserDto.Email);
            if (user == null)
            {
                int userId = await _userRepository.AddUser(new User()
                {
                    Email = createUserDto.Email,
                    Password = createUserDto.Password,
                    Name = createUserDto.Name,
                    Phone = createUserDto.Phone
                });
                return new JwtUserDto()
                {
                    UserId = userId,
                    Email = user.Email,
                    Name = user.Name
                };
            }
            return null;
        }

        public JwtUserDto? ValidateUser(UserDto userDto)
        {
            User? user = _userRepository.ValidateUser(userDto.Email, userDto.Password);
            if (user != null)
            {
                return new JwtUserDto()
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    Name = user.Name
                };
            };
            return null;
        }
    }
}