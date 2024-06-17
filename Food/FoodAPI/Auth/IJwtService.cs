using System.IdentityModel.Tokens.Jwt;
using FoodAPI.DataModels;

namespace FoodAPI.Auth;
public interface IJwtService
{
    string CreateJwtToken(User user);

    bool ValidateToken(String token, out JwtSecurityToken jwtToken);
}