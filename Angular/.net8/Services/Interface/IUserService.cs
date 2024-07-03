using Services.Dtos;

namespace Services.Interface
{
    public interface IUserService
    {
        Task<JwtUserDto?> AddUser(CreateUserDto createUserDto);

        JwtUserDto? ValidateUser(UserDto userDto);
    }
}