using System.Net;
using FoodAPI.Auth;
using FoodAPI.DataModels;
using FoodAPI.Dtos;
using FoodDbContext;
using Microsoft.AspNetCore.Mvc;

namespace FoodAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly APIResponse _apiResponse;
        private readonly FoodContext _foodContext;
        private readonly IJwtService _jwtService;

        public UserController(FoodContext foodContext, IJwtService jwtService)
        {
            _foodContext = foodContext;
            _jwtService = jwtService;
            _apiResponse = new();
        }

        [HttpPatch("ValidateUser", Name = "ValidateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<APIResponse> ValidateUser([FromBody] UserDto model)
        {
            try
            {
                if (model == null)
                {
                    _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                    _apiResponse.ErrorMessage = new List<string>() { "URL is Not Valid." };
                    return BadRequest(_apiResponse);
                }
                User? user = _foodContext.Users.FirstOrDefault(a => a.Email == model.Email && a.Password == model.Password);
                if (user == null)
                {
                    _apiResponse.StatusCode = HttpStatusCode.NotFound;
                    _apiResponse.ErrorMessage = new List<string>() { "User is Not Found." };
                    return NotFound(_apiResponse);
                }
                _apiResponse.StatusCode = HttpStatusCode.OK;
                _apiResponse.IsSusses = true;
                _apiResponse.Result = new
                {
                    jwtToken = _jwtService.CreateJwtToken(user),
                    userId = user.UserId,
                    name = user.Name
                };
                return Ok(_apiResponse);
            }
            catch (Exception e)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.ErrorMessage = new List<string>() { e.ToString() };
                return BadRequest(_apiResponse);
            }
        }

        [HttpPost("CreateUser", Name = "CreateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> CreateUser([FromBody] CreateUserDto model)
        {
            try
            {
                if (model == null)
                {
                    _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                    _apiResponse.ErrorMessage = new List<string>() { "URL is Not Valid." };
                    return BadRequest(_apiResponse);
                }
                User user = new User()
                {
                    Email = model.Email,
                    Password = model.Password,
                    Name = model.Name,
                    Phone = model.Phone
                };
                _foodContext.Users.Add(user);
                _apiResponse.IsSusses = await _foodContext.SaveChangesAsync() > 0;
                _apiResponse.Result = _apiResponse.Result = new
                {
                    userId = user.UserId,
                    name = user.Name
                };
                return Ok(_apiResponse);
            }
            catch (Exception e)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.ErrorMessage = new List<string>() { e.ToString() };
                return BadRequest(_apiResponse);
            }
        }
    }
}