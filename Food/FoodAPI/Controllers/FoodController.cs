using FoodAPI.Dtos;
using FoodAPI.StaticMethods;
using FoodDbContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Dtos;

namespace FoodAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly FoodContext _foodContext;
        private readonly string? _configurationString;
        private readonly ICartService _cartService;
        private readonly IOrderService _orderService;

        public FoodController(FoodContext foodContext, IConfiguration configuration, ICartService cartService, IOrderService orderService)
        {
            _foodContext = foodContext;
            _cartService = cartService;
            _orderService = orderService;
            _configurationString = configuration.GetConnectionString("DefaultString");
        }

        [Authorization]
        [HttpGet("GetFoodList", Name = "GetFoodList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<APIResponse> GetFoodList()
        {
            try
            {
                var foodList = _foodContext.FoodLists.ToList();
                return Ok(HelperClass.ManageOkRequest(foodList));
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadRequest(e.ToString()));
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
                return Ok(HelperClass.ManageOkRequest(result));
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadRequest(e.ToString()));
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
                return Ok(HelperClass.ManageOkRequest(result));
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadRequest(e.ToString()));
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
                    return BadRequest(HelperClass.ManageBadRequest("UserId Invalid."));
                }
                if (await _cartService.AddProductToCart(model))
                {
                    return Ok(HelperClass.ManageOkRequest(model));
                }
                return StatusCode(500, HelperClass.ManageInternalServerError());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadRequest(e.ToString()));
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
                    return BadRequest(HelperClass.ManageBadRequest("Invalid Request."));
                }
                if (await _cartService.ChangeCart(userId, cartId, newCount))
                {
                    return Ok(HelperClass.ManageOkRequest(new
                    {
                        cartId = cartId
                    }));
                }
                return StatusCode(500, HelperClass.ManageInternalServerError());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadRequest(e.ToString()));
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
                    return BadRequest(HelperClass.ManageBadRequest("Invalid Request."));
                }
                if (await _orderService.AddOrder(orderDto, userId))
                {
                    if (await _cartService.DeleteCarts(userId))
                    {
                        return Ok(HelperClass.ManageOkRequest(orderDto));
                    }
                }
                return StatusCode(500, HelperClass.ManageInternalServerError());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadRequest(e.ToString()));
            }
        }
    }
}