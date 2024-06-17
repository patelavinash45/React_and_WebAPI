using System.Data;
using System.Net;
using Npgsql;

namespace FoodAPI.StaticMethods;
public static class HelperClass
{
    private static APIResponse ManageAPIResponse(HttpStatusCode httpStatusCode, object? result, object? errorMessage, bool isSusses = false)
    {
        return new APIResponse()
        {
            StatusCode = httpStatusCode,
            IsSusses = isSusses,
            Result = result,
            ErrorMessage = errorMessage,
        };
    }

    public static DataTable ManageQuery(string query, int parameter, string? configurationString)
    {
        var connection = new NpgsqlConnection(configurationString);
        connection.Open();
        var command = new NpgsqlCommand(query, connection);
        command.Parameters.AddWithValue("@userId", parameter);
        DataTable dataTable = new();
        using (var reader = command.ExecuteReader())
        {
            dataTable.Load(reader);
        }
        connection.Close();
        return dataTable;
    }

    public static APIResponse ManageOkRequest(object result)
    {
        return ManageAPIResponse(HttpStatusCode.OK, result, null, true);
    }

    public static APIResponse ManageBadRequest(string errorMessage)
    {
        return ManageAPIResponse(HttpStatusCode.BadRequest, null, new List<string>() { errorMessage });
    }

    public static APIResponse ManageInternalServerError()
    {
        return ManageAPIResponse(HttpStatusCode.InternalServerError, null, new List<string>() { "Something Went Wrong." });
    }
}