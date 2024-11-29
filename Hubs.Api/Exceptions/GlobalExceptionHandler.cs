using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Hubs.Api.Exceptions;

public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception,
        CancellationToken cancellationToken)
    {
        var problemFactory = httpContext.RequestServices.GetRequiredService<ProblemDetailsFactory>();
        switch (exception)
        {
            case HubExistsException ex:
            {
                const int statusCode = StatusCodes.Status409Conflict;
                var problem = problemFactory.CreateProblemDetails(httpContext, statusCode,
                    ex.Message);
                httpContext.Response.StatusCode = statusCode;
                await httpContext.Response.WriteAsJsonAsync(problem, cancellationToken);
                return true;
            }
            case HubNotFoundException ex:
            {
                const int statusCode = StatusCodes.Status404NotFound;
                var problem = problemFactory.CreateProblemDetails(httpContext, statusCode,
                    ex.Message);
                httpContext.Response.StatusCode = statusCode;
                await httpContext.Response.WriteAsJsonAsync(problem, cancellationToken);
                return true;
            }
            case PostNotFoundException ex:
            {
                const int statusCode = StatusCodes.Status404NotFound;
                var problem = problemFactory.CreateProblemDetails(httpContext, statusCode,
                    ex.Message);
                httpContext.Response.StatusCode = statusCode;
                await httpContext.Response.WriteAsJsonAsync(problem, cancellationToken);
                return true;
            }
            case NotAuthorizedException ex:
            {
                const int statusCode = StatusCodes.Status401Unauthorized;
                var problem = problemFactory.CreateProblemDetails(httpContext, statusCode,
                    ex.Message);
                httpContext.Response.StatusCode = statusCode;
                await httpContext.Response.WriteAsJsonAsync(problem, cancellationToken);
                return true;
            }
            case VoteException ex:
            {
                const int statusCode = StatusCodes.Status409Conflict;
                var problem = problemFactory.CreateProblemDetails(httpContext, statusCode,
                    ex.Message);
                httpContext.Response.StatusCode = statusCode;
                await httpContext.Response.WriteAsJsonAsync(problem, cancellationToken);
                return true;
            }
            default:
                return false;
        }
    }
}