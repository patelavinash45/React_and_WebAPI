using System.IdentityModel.Tokens.Jwt;
using System.Net;
using FoodAPI.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;

public class Authorization : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        APIResponse apiResponse = new APIResponse();
        IHeaderDictionary header = context.HttpContext.Request.Headers;
        if (!header.TryGetValue("Authorization", out StringValues authorization))
        {
            apiResponse.StatusCode = HttpStatusCode.BadRequest;
            apiResponse.ErrorMessage = new List<String>() { "Authorization header missing" };
            context.Result = new BadRequestObjectResult(apiResponse);
            return;
        }
        else
        {
            JwtSecurityToken jwtToken = new JwtSecurityToken();
            IJwtService? jwtService = context.HttpContext.RequestServices.GetService<IJwtService>();
            if (jwtService != null)
            {
                bool IsValid = jwtService.ValidateToken(authorization[0], out jwtToken);
                if (!IsValid)
                {
                    apiResponse.StatusCode = HttpStatusCode.Unauthorized;
                    apiResponse.ErrorMessage = new List<String>() { "Authorization Token Is Invalid." };
                    context.Result = new UnauthorizedObjectResult(apiResponse);
                    return;
                }
            }
            else
            {
                apiResponse.StatusCode = HttpStatusCode.InternalServerError;
                apiResponse.ErrorMessage = new List<String>() { "Authorization Token Is Invalid." };
                context.Result = new ObjectResult(apiResponse) { StatusCode = (int)HttpStatusCode.InternalServerError };
                return;
            }
        }
    }
}