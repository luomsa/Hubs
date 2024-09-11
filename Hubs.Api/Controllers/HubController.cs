using Hubs.Api.Data;
using Hubs.Api.Models;
using Hubs.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Hubs.Api.Controllers;

[ApiController]
[Route("hubs")]
public class HubController : ControllerBase
{
    private readonly IHubService _hubService;
    private readonly UserManager<User> _userManager;

    public HubController(IHubService hubService, UserManager<User> userManager)
    {
        _hubService = hubService;
        _userManager = userManager;
    }

    [Authorize]
    [Route("")]
    [HttpPost]
    public async Task<IResult> CreateHub(NewHubRequest request)
    {
        var user = await _userManager.GetUserAsync(HttpContext.User);
        if (user is null) return TypedResults.Unauthorized();
        await _hubService.CreateAsync(request, user);
        return TypedResults.Ok();
    }

    [Route("{username}")]
    [HttpGet]
    public async Task<IResult> GetHubByName(string username)
    {
        var result = await _hubService.GetByNameAsync(username);
        return result is null ? TypedResults.NotFound() : TypedResults.Ok(result);
    }
}