using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Dtos;
using Services.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Services.Implementation
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string CreateJwtToken(JwtUserDto user)
        {
            List<Claim> claims = new()
            {
                new("userId", user.UserId.ToString()),
                new("name", user.Name),
                new("email", user.Email)
            };
            SymmetricSecurityKey Key = new(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]!));
            SigningCredentials creds = new(Key, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken token = new(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool ValidateToken(string? token, out JwtSecurityToken? jwtToken)
        {
            jwtToken = null;
            if (token != null)
            {
                JwtSecurityTokenHandler tokenHandler = new();
                SymmetricSecurityKey Key = new(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]!));
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
                    return jwtToken != null;
                }
                catch (Exception ex) { }
            }
            return false;
        }
    }
}