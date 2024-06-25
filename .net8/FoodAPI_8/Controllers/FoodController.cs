using Asp.Versioning;
using FoodAPI.Dtos;
using FoodAPI.StaticMethods;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Dtos;
using Services.Interface;

namespace FoodAPI.Controllers
{
    //[Authorization]
    [ApiController]
    [Route("[controller]")]
    [ApiVersion("1")]
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

        [HttpPatch("GetFoodList/pageNo={pageNo}&pageSize={pageSize}", Name = "GetFoodList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<APIResponse> GetFoodList([FromBody] FilterDto filterDto, int pageNo = 1, int pageSize = 5)
        {
            try
            {
                var foodList = _cartService.GetFoodDtos(filterDto, pageNo, pageSize);
                return Ok(HelperClass.ManageOkResponse(foodList));
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }

        [HttpGet("GetFood/{foodId}", Name = "GetFood")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<APIResponse> GetFood(int foodId)
        {
            try
            {
                if (foodId <= 0)
                {
                    return BadRequest(HelperClass.ManageBadResponse("FoodId Invalid."));
                }
                var foodList = _cartService.GetFood(foodId);
                if (foodList != null)
                {
                    return Ok(HelperClass.ManageOkResponse(foodList));
                }
                return StatusCode(500, HelperClass.ManageInternalServerErrorResponse());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }

        [HttpPost("AddFood", Name = "AddFood")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> AddFood([FromBody] CreateFoodDto createFoodDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(HelperClass.ManageBadResponse("Food Is Invalid."));
                }
                int foodId = await _cartService.AddFood(createFoodDto);
                if (foodId > 0)
                {
                    return Ok(HelperClass.ManageOkResponse(new List<int>() { foodId }));
                }
                return StatusCode(500, HelperClass.ManageInternalServerErrorResponse());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }

        [HttpPost("UpdateFood/{foodId}", Name = "UpdateFood")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> UpdateFood(int foodId, [FromBody] FoodDto foodDto)
        {
            try
            {
                if (!ModelState.IsValid || foodId <= 0)
                {
                    return BadRequest(HelperClass.ManageBadResponse("Food Is Invalid."));
                }
                if (await _cartService.UpdateFood(foodDto, foodId))
                {
                    return Ok(HelperClass.ManageOkResponse(foodDto));
                }
                return StatusCode(500, HelperClass.ManageInternalServerErrorResponse());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }

        [HttpDelete("DeleteFood/{foodId}", Name = "DeleteFood")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> DeleteFood(int foodId)
        {
            try
            {
                if (foodId <= 0)
                {
                    return BadRequest(HelperClass.ManageBadResponse("FoodId Invalid."));
                }
                if (await _cartService.DeleteFood(foodId))
                {
                    return Ok(HelperClass.ManageOkResponse(new List<int>() { foodId }));
                }
                return StatusCode(500, HelperClass.ManageInternalServerErrorResponse());
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }


        [HttpGet("GetCartList/{userId}", Name = "GetCartList")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<APIResponse> GetCartList(int userId)
        {
            try
            {
                if (userId <= 0)
                {
                    return BadRequest(HelperClass.ManageBadResponse("UserId Invalid."));
                }
                object result = HelperClass.ManageQuery("SELECT getCart(@userId)", userId, _configurationString);
                return Ok(HelperClass.ManageOkResponse(result));
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }


        [HttpGet("GetCartCount/{userId}", Name = "GetCartCount")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<APIResponse> GetCartCount(int userId)
        {
            try
            {
                if (userId <= 0)
                {
                    return BadRequest(HelperClass.ManageBadResponse("UserId Invalid."));
                }
                object result = HelperClass.ManageQuery("SELECT getCartCount(@userId)", userId, _configurationString);
                return Ok(HelperClass.ManageOkResponse(result));
            }
            catch (Exception e)
            {
                return BadRequest(HelperClass.ManageBadResponse(e.ToString()));
            }
        }


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