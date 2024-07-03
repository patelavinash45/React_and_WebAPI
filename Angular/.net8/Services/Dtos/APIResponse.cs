using System.Net;

public class APIResponse
{
    public HttpStatusCode StatusCode { get; set; }

    public bool IsSusses { get; set; } = false;

    public object? ErrorMessage { get; set; }

    public object? Result { get; set; }
}