using FoodAPI.Dtos;
using FoodAPI.StaticMethods;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Dtos;
using Services.Interface;

namespace FoodAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly string? _configurationString;
        private readonly ICartService _cartService;
        private readonly IOrderService _orderService;

        public FoodController(IConfiguration configuration, ICartService cartService, IOrderService orderService)
        {
            _cartService = cartService;
            _orderService = orderService;
            _configurationString = configuration.GetConnectionString("DefaultString");
        }

        [Authorization]
        [HttpGet("GetFoodList/{userId}", Name = "GetFoodList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<APIResponse> GetFoodList(int userId)
        {
            try
            {
                var foodList = _cartService.GetFoodDtos();
                return Ok(HelperClass.ManageOkResponse(foodList));
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }

        [Authorization]
        [HttpGet("GetCartList/{userId}", Name = "GetCartList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<APIResponse> GetCartList(int userId)
        {
            try
            {
                object result = HelperClass.ManageQuery("SELECT getCart(@userId)", userId, _configurationString);
                return Ok(HelperClass.ManageOkResponse(result));
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }

        [Authorization]
        [HttpGet("GetCartCount/{userId}", Name = "GetCartCount")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<APIResponse> GetCartCount(int userId)
        {
            try
            {
                object result = HelperClass.ManageQuery("SELECT getCartCount(@userId)", userId, _configurationString);
                return Ok(HelperClass.ManageOkResponse(result));
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }

        [Authorization]
        [HttpPost("AddProductToCart/{userId}", Name = "AddProductToCart")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> AddProductToCart(int userId, [FromBody] CartDto model)
        {
            try
            {
                if (userId <= 0 || model.UserId <= 0)
                {
                    return BadRequest(HelperClass.ManageBadResponse("UserId Invalid."));
                }
                if (await _cartService.AddProductToCart(model))
                {
                    return Ok(HelperClass.ManageOkResponse(model));
                }
                return StatusCode(500, HelperClass.ManageInternalServerErrorResponse());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }

        [Authorization]
        [HttpPost("ChangeCart/{userId}", Name = "ChangeCart")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> ChangeCart(int userId, int cartId, int newCount)
        {
            try
            {
                if (userId <= 0 || cartId <= 0 || newCount <= 0)
                {
                    return BadRequest(HelperClass.ManageBadResponse("Invalid Request."));
                }
                if (await _cartService.ChangeCart(userId, cartId, newCount))
                {
                    return Ok(HelperClass.ManageOkResponse(new
                    {
                        cartId = cartId
                    }));
                }
                return StatusCode(500, HelperClass.ManageInternalServerErrorResponse());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }

        [Authorization]
        [HttpPost("PlaceOrder/{userId}", Name = "PlaceOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> PlaceOrder(int userId, [FromBody] OrderDto orderDto)
        {
            try
            {
                if (userId <= 0 || orderDto == null)
                {
                    return BadRequest(HelperClass.ManageBadResponse("Invalid Request."));
                }
                if (await _orderService.AddOrder(orderDto, userId))
                {
                    if (await _cartService.DeleteCarts(userId))
                    {
                        return Ok(HelperClass.ManageOkResponse(orderDto));
                    }
                }
                return StatusCode(500, HelperClass.ManageInternalServerErrorResponse());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }
    }
}