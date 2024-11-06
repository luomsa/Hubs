using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Hubs.Test;

internal class FakeUserFilter : IAsyncActionFilter
{
   
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            context.HttpContext.User = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
            {
                new (ClaimTypes.NameIdentifier, "7102dc8d-0fec-466d-ae71-6995316233b1"),
                new (ClaimTypes.Name, "testuser"),
            }));

            await next();
        }
}