namespace FoodAPI.Dtos;

public class UserDto
{
    public required string Email { get; set; }

    public required string Password { get; set; }
}

public class CreateUserDto
{
    public required string Name { get; set; }

    public required string Email { get; set; }

    public required string Password { get; set; }

    public required string Phone { get; set; }
}