using FoodAPI.Auth;
using FoodAPI.DataModels;
using FoodAPI.Dtos;
using FoodDbContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Data;
using System.Net;

namespace FoodAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly APIResponse _apiResponse;
        private readonly FoodContext _foodContext;
        private readonly IConfiguration _configuration;
        private readonly IJwtService _jwtService;

        public FoodController(FoodContext foodContext, IConfiguration configuration, IJwtService jwtService)
        {
            _apiResponse = new();
            _foodContext = foodContext;
            _configuration = configuration;
            _jwtService = jwtService;
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
                _apiResponse.StatusCode = HttpStatusCode.OK;
                _apiResponse.IsSusses = true;
                _apiResponse.Result = _foodContext.FoodLists.ToList();
                return Ok(_apiResponse);
            }
            catch (Exception e)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.ErrorMessage = new List<string>() { e.ToString() };
                return BadRequest(_apiResponse);
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
                _apiResponse.StatusCode = HttpStatusCode.OK;
                _apiResponse.IsSusses = true;
                var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultString"));
                connection.Open();
                var command = new NpgsqlCommand("SELECT getCart(@userId)", connection);
                command.Parameters.AddWithValue("@userId", userId);
                DataTable dataTable = new();
                using (var reader = command.ExecuteReader())
                {
                    dataTable.Load(reader);
                }
                connection.Close();
                _apiResponse.Result = dataTable;
                //_apiResponse.Result = _foodContext.Carts.Include(a => a.Food).Include(a => a.User).Where(a => a.UserId == userId).ToList();
                //_apiResponse.Result = _foodContext.FoodLists.Include(a => a.Carts.Where(a =>a.UserId == userId)).Where(a => a.Carts.Any()).ToList();
                return Ok(_apiResponse);
            }
            catch (Exception e)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.ErrorMessage = new List<string>() { e.ToString() };
                return BadRequest(_apiResponse);
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
                _apiResponse.StatusCode = HttpStatusCode.OK;
                _apiResponse.IsSusses = true;
                var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultString"));
                connection.Open();
                var command = new NpgsqlCommand("SELECT getCartCount(@userId)", connection);
                command.Parameters.AddWithValue("@userId", userId);
                DataTable dataTable = new();
                using (var reader = command.ExecuteReader())
                {
                    dataTable.Load(reader);
                }
                connection.Close();
                _apiResponse.Result = dataTable;
                return Ok(_apiResponse);
            }
            catch (Exception e)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.ErrorMessage = new List<string>() { e.ToString() };
                return BadRequest(_apiResponse);
            }
        }

        [Authorization]
        [HttpPost("AddProductToCart/{userId}", Name = "AddProductToCart")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> AddProductToCart(int userId, [FromBody] Cart model)
        {
            try
            {
                if (userId <= 0 || model.UserId <= 0)
                {
                    _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                    _apiResponse.ErrorMessage = new List<string>() { "UserId is Not Valid." };
                    return BadRequest(_apiResponse);
                }
                Cart? cart = _foodContext.Carts.FirstOrDefault(a => a.UserId == userId && a.FoodId == model.FoodId);
                if (cart == null)
                {
                    _foodContext.Carts.Add(model);
                }
                else
                {
                    cart.Count += model.Count;
                    _foodContext.Carts.Update(cart);
                }
                _apiResponse.IsSusses = await _foodContext.SaveChangesAsync() > 0;
                _apiResponse.Result = cart ?? model;
                _apiResponse.StatusCode = HttpStatusCode.OK;
                return Ok(_apiResponse);
            }
            catch (Exception e)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.ErrorMessage = new List<string>() { e.ToString() };
                return BadRequest(_apiResponse);
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
                    _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                    _apiResponse.ErrorMessage = new List<string>() { "Invalid Request." };
                    return BadRequest(_apiResponse);
                }
                Cart? cart = _foodContext.Carts.FirstOrDefault(a => a.UserId == userId && a.CartId == cartId);
                cart.Count = newCount;
                _foodContext.Carts.Update(cart);
                _apiResponse.IsSusses = await _foodContext.SaveChangesAsync() > 0;
                _apiResponse.StatusCode = HttpStatusCode.OK;
                _apiResponse.Result = cart;
                return Ok(_apiResponse);
            }
            catch (Exception e)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.ErrorMessage = new List<string>() { e.ToString() };
                return BadRequest(_apiResponse);
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
                    _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                    _apiResponse.ErrorMessage = new List<string>() { "Invalid Request." };
                    return BadRequest(_apiResponse);
                }
                Order order = new()
                {
                    UserId = userId,
                    Date = DateTime.Now,
                    Address = orderDto.Address,
                    OrderDetails = orderDto.OrderDetailsDtos.Select(
                        orderDto => new OrderDetail()
                        {
                            FoodId = orderDto.FoodId,
                            Count = orderDto.Count,
                            Amount = orderDto.Amount,
                        }).ToList(),
                };
                _foodContext.Orders.Add(order);
                List<Cart> carts = _foodContext.Carts.Where(a => a.UserId == userId).ToList();
                _foodContext.Carts.RemoveRange(carts);
                _apiResponse.IsSusses = await _foodContext.SaveChangesAsync() > 0;
                _apiResponse.StatusCode = HttpStatusCode.OK;
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