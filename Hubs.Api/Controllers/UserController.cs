using Hubs.Api.Data;
using Hubs.Api.Models;
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
    private readonly HubDbContext _context;

    public UserController(SignInManager<User> signInManager, HubDbContext context)
    {
        _signInManager = signInManager;
        _context = context;
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

        var joinedHubs = await _context.HubMembers.Where(hm => hm.User.Id == user.Id)
            .Select(h => new SidebarHubDto() { HubId = h.HubId, Name = h.Hub.Name }).ToListAsync();

        return TypedResults.Ok(new UserDto() { Username = user.UserName, UserId = user.Id, JoinedHubs = joinedHubs});
    }

    [Authorize]
    [Route("feed")]
    [HttpGet]
    public IResult GetFeed()
    {
        return TypedResults.Ok();
    }
}