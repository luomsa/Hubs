using Hubs.Api.Data;
using Hubs.Api.Models;
using Hubs.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hubs.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly SignInManager<User> _signInManager;
    private readonly IUserService _userService;

    public UserController(SignInManager<User> signInManager, IUserService userService)
    {
        _signInManager = signInManager;
        _userService = userService;
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

        var joinedHubs = await _userService.GetJoinedHubs(user);

        return TypedResults.Ok(new UserDto() { Username = user.UserName, UserId = user.Id, JoinedHubs = joinedHubs });
    }

    [Authorize]
    [Route("posts")]
    [HttpGet]
    [ProducesResponseType<HubPostsDto>(StatusCodes.Status200OK)]
    public async Task<IResult> GetUserPosts([FromQuery(Name = "time")] TimeSortOrder time = TimeSortOrder.Day, [FromQuery(Name = "page")] int page = 0,
        [FromQuery(Name = "sort")] SortOrder sort = SortOrder.New)
    {
        var user = await _signInManager.UserManager.GetUserAsync(HttpContext.User);
        if (user is null)
        {
            return TypedResults.Unauthorized();
        }

        var posts = await _userService.GetUserPosts(user, sort, time, page);
        return TypedResults.Ok(new HubPostsDto() {Posts = posts.Count > 20 ? posts[..^1] : posts, HasMore = posts.Count == 21});
    }
}