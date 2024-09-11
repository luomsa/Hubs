using Hubs.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Hubs.Api.Controllers;
[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    private readonly SignInManager<User> _signInManager;

    public UserController(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    [Authorize]
    [Route("me")]
    [HttpGet]
    public async Task<IResult> GetCurrentUser()
    {
        var user = await _signInManager.UserManager.GetUserAsync(HttpContext.User);
        if (user is null)
        {
            return TypedResults.Unauthorized();
        }

        return TypedResults.Ok(new { Username = user.UserName, Id = user.Id });
    }

    [Authorize]
    [Route("feed")]
    [HttpGet]
    public IResult GetFeed()
    {
        return TypedResults.Ok();
    }
}