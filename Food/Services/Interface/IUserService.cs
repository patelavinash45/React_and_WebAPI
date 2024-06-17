using Services.Dtos;

public interface IUserService
{
    Task<JwtUserDto?> AddUser(CreateUserDto createUserDto);

    JwtUserDto? ValidateUser(UserDto userDto);
}