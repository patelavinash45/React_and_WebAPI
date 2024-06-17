using System.Net;

namespace Services.ViewModel;

public class APIResponse
{
    public HttpStatusCode StatusCode { get; set; }

    public bool IsSuccess { get; set; } = true;

    public object Result { get; set; }
}
