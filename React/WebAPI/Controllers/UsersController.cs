using Microsoft.AspNetCore.Mvc;
using Services;
using Services.ViewModel;
using System.Net;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        protected APIResponse _APIResponse;
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
            _APIResponse = new();
        }

        [HttpPost(Name = "ValidateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> ValidateUser([FromBody] UserView model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _APIResponse.StatusCode = HttpStatusCode.BadRequest;
                    _APIResponse.IsSuccess = false;
                    return BadRequest(_APIResponse);
                }
                _APIResponse.IsSuccess = await _userService.ValidateUser(model);
                if (!_APIResponse.IsSuccess)
                {
                    _APIResponse.IsSuccess = false;
                    _APIResponse.StatusCode = HttpStatusCode.NotFound;
                    return NotFound(_APIResponse);
                }
                _APIResponse.Result = model;
                _APIResponse.StatusCode = HttpStatusCode.OK;
                return Ok(_APIResponse);
            }
            catch (Exception e)
            {
                _APIResponse.Result = new List<string>() { e.ToString() };
                _APIResponse.IsSuccess = false;
                _APIResponse.StatusCode = HttpStatusCode.BadRequest;
                return BadRequest(_APIResponse);
            }
        }
    }
}
