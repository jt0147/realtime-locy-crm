using Microsoft.AspNetCore.Diagnostics;

namespace VslCrmApiRealTime.Middlewares
{
    public class ApiExceptionHandler : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            await httpContext.Response.WriteAsJsonAsync("Something when wrong!");
            httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

            return true;
        }
    }
}
