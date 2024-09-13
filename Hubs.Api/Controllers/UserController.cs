using Hubs.Api.Data;
using Hubs.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Hubs.Api.Controllers;
[ApiController]
[Route("api/users")]
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
    [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
    public async Task<IResult> GetCurrentUser()
    {
        var user = await _signInManager.UserManager.GetUserAsync(HttpContext.User);
        if (user is null)
        {
            return TypedResults.Unauthorized();
        }

        return TypedResults.Ok(new UserDto() { Username = user.UserName, UserId = user.Id });
    }

    [Authorize]
    [Route("feed")]
    [HttpGet]
    public IResult GetFeed()
    {
        return TypedResults.Ok();
    }
}