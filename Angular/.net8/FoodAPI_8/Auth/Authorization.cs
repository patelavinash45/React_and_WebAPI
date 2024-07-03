using System.IdentityModel.Tokens.Jwt;
using FoodAPI.StaticMethods;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;
using Services.Interface;
public class Authorization : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        IHeaderDictionary header = context.HttpContext.Request.Headers;
        if (!header.TryGetValue("Authorization", out StringValues authorization))
        {
            context.Result = new BadRequestObjectResult(HelperClass.ManageBadResponse("Authorization header missing."));
            return;
        }
        else
        {
            JwtSecurityToken jwtToken = new JwtSecurityToken();
            IJwtService? jwtService = context.HttpContext.RequestServices.GetService<IJwtService>();
            if (jwtService == null || !jwtService.ValidateToken(authorization[0], out jwtToken))
            {
                context.Result = new UnauthorizedObjectResult(HelperClass.ManageBadResponse("Authorization Token Is Invalid."));
                return;
            }
        }
    }
}