using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FoodAPI.DataModels;
using Microsoft.IdentityModel.Tokens;

namespace FoodAPI.Auth;
public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;

    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string CreateJwtToken(User user)
    {
        List<Claim> claims = new List<Claim>{
            new("userId", user.UserId.ToString()),
            new("name", user.Name),
            new("email", user.Email)
        };
        SymmetricSecurityKey Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]));
        SigningCredentials creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);
        JwtSecurityToken token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(5),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public bool ValidateToken(String token, out JwtSecurityToken? jwtToken)
    {
        jwtToken = null;
        if (token != null)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SymmetricSecurityKey Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]));
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = Key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken securityToken);
                jwtToken = (JwtSecurityToken)securityToken;
                if (jwtToken != null)
                {
                    return true;
                }
            }
            catch (Exception ex) { }
        }
        return false;
    }
}