using Services.Dtos;
using System.IdentityModel.Tokens.Jwt;

public interface IJwtService
{
    string CreateJwtToken(JwtUserDto user);

    bool ValidateToken(string? token, out JwtSecurityToken jwtToken);
}