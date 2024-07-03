using FoodAPI.StaticMethods;
using Microsoft.AspNetCore.Mvc;
using Services.Dtos;
using Services.Interface;

namespace FoodAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        private readonly IUserService _userService;

        public UserController(IJwtService jwtService, IUserService userService)
        {
            _jwtService = jwtService;
            _userService = userService;
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
                    return BadRequest(HelperClass.ManageBadResponse("URL is Not Valid."));
                }
                JwtUserDto? jwtUserDto = _userService.ValidateUser(model);
                if (jwtUserDto != null)
                {
                    var result = new
                    {
                        jwtToken = _jwtService.CreateJwtToken(jwtUserDto),
                        userId = jwtUserDto.UserId,
                        name = jwtUserDto.Name
                    };
                    return Ok(HelperClass.ManageOkResponse(result));
                }
                return NotFound(HelperClass.ManageNotFoundRequest());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
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
                    return BadRequest(HelperClass.ManageBadResponse("URL is Not Valid."));
                }
                JwtUserDto? jwtUserDto = await _userService.AddUser(model);
                if (jwtUserDto != null)
                {
                    var result = new
                    {
                        jwtToken = _jwtService.CreateJwtToken(jwtUserDto),
                        userId = jwtUserDto.UserId,
                        name = jwtUserDto.Name
                    };
                    return Ok(HelperClass.ManageOkResponse(result));
                }
                return StatusCode(500, HelperClass.ManageInternalServerErrorResponse());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }

        [Authorization]
        [HttpGet("ValidateJwtToken", Name = "ValidateJwtToken")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<APIResponse> ValidateJwtToken()
        {
            try
            {
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }
    }
}