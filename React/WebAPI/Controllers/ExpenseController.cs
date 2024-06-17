using Microsoft.AspNetCore.Mvc;
using Services;
using Services.ViewModel;
using System.Net;
namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpenseControllers : ControllerBase
{
    protected APIResponse _APIResponse;
    private readonly IExpenseService _expenseService;

    public ExpenseControllers(IExpenseService expenseService)
    {
        _expenseService = expenseService;
        _APIResponse = new();
    }

    [HttpGet(Name = "GetAllStudents")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<APIResponse> GetAllStudents(int pageNo, int year, int month)
    {
        try
        {
            if (pageNo <= 0 || year < 0 || month < 0)
            {
                _APIResponse.StatusCode = HttpStatusCode.BadRequest;
                _APIResponse.IsSuccess = false;
                return BadRequest(_APIResponse);
            }
            _APIResponse.Result = _expenseService.GetAllExpenses(year, month, pageNo);
            _APIResponse.StatusCode = HttpStatusCode.OK;
            return Ok(_APIResponse);
        }
        catch (Exception e)
        {
            _APIResponse.Result = new List<string>() { e.ToString() };
            _APIResponse.IsSuccess = false;
            return _APIResponse;
        }
    }

    [HttpGet("{id:int}", Name = "GetStudent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<APIResponse> GetStudent(int id)
    {
        try
        {
            if (id <= 0)
            {
                _APIResponse.StatusCode = HttpStatusCode.BadRequest;
                _APIResponse.IsSuccess = false;
                return BadRequest(_APIResponse);
            }
            ExpenseView expense = _expenseService.GetExpenseById(id);
            if (expense == null)
            {
                _APIResponse.StatusCode = HttpStatusCode.NotFound;
                _APIResponse.IsSuccess = false;
                return NotFound(_APIResponse);
            }
            _APIResponse.Result = new List<ExpenseView>() { expense };
            _APIResponse.StatusCode = HttpStatusCode.OK;
            return Ok(_APIResponse);
        }
        catch (Exception e)
        {
            _APIResponse.Result = new List<string>() { e.ToString() };
            _APIResponse.IsSuccess = false;
            return _APIResponse;
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<APIResponse>> AddStudents([FromBody] AddExpenseView model)
    {
        try
        {
            if (model == null || !ModelState.IsValid)
            {
                _APIResponse.StatusCode = HttpStatusCode.BadRequest;
                _APIResponse.IsSuccess = false;
                return BadRequest(_APIResponse);
            }
            _APIResponse.IsSuccess = await _expenseService.AddExpense(model);
            _APIResponse.Result = model;
            _APIResponse.StatusCode = _APIResponse.IsSuccess ? HttpStatusCode.Created : HttpStatusCode.InternalServerError;
            return Ok(_APIResponse);
        }
        catch (Exception e)
        {
            _APIResponse.Result = new List<string>() { e.ToString() };
            _APIResponse.IsSuccess = false;
            return _APIResponse;
        }
    }

    [HttpDelete("{id=int}", Name = "DeleteStudent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<APIResponse>> DeleteStudent(int id)
    {
        try
        {
            if (id <= 0)
            {
                _APIResponse.StatusCode = HttpStatusCode.BadRequest;
                _APIResponse.IsSuccess = false;
                return BadRequest(_APIResponse);
            }
            _APIResponse.IsSuccess = await _expenseService.DeleteExpense(id);
            if (!_APIResponse.IsSuccess)
            {
                _APIResponse.StatusCode = HttpStatusCode.NotFound;
                _APIResponse.IsSuccess = false;
                return NotFound(_APIResponse);
            }
            _APIResponse.StatusCode = HttpStatusCode.OK;
            return Ok(_APIResponse);
        }
        catch (Exception e)
        {
            _APIResponse.Result = new List<string>() { e.ToString() };
            _APIResponse.IsSuccess = false;
            return _APIResponse;
        }
    }

    [HttpPut("{id=int}", Name = "UpdateStudent")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<APIResponse>> UpdateStudent(int id, ExpenseView model)
    {
        try
        {
            if (model == null || id <= 0 || !ModelState.IsValid)
            {
                _APIResponse.StatusCode = HttpStatusCode.BadRequest;
                _APIResponse.IsSuccess = false;
                return BadRequest(_APIResponse);
            }
            _APIResponse.IsSuccess = await _expenseService.UpdateExpense(model);
            if (!_APIResponse.IsSuccess)
            {
                _APIResponse.StatusCode = HttpStatusCode.NotFound;
                _APIResponse.IsSuccess = false;
                return NotFound(_APIResponse);
            }
            _APIResponse.Result = model;
            _APIResponse.StatusCode = HttpStatusCode.NoContent;
            return Ok(_APIResponse);
        }
        catch (Exception e)
        {
            _APIResponse.Result = new List<string>() { e.ToString() };
            _APIResponse.IsSuccess = false;
            return _APIResponse;
        }
    }
}
