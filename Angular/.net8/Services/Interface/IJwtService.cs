using Services.Dtos;
using System.IdentityModel.Tokens.Jwt;

namespace Services.Interface
{
    public interface IJwtService
    {
        string CreateJwtToken(JwtUserDto user);

        bool ValidateToken(string? token, out JwtSecurityToken jwtToken);
    }
}