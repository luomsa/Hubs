using Hubs.Api.Data;
using Hubs.Api.Models;
using Hubs.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Hubs.Api.Controllers;

[ApiController]
[Route("api/hubs")]
public class HubController : ControllerBase
{
    private readonly IHubService _hubService;
    private readonly IPostService _postService;
    private readonly UserManager<User> _userManager;

    public HubController(IHubService hubService, UserManager<User> userManager, IPostService postService)
    {
        _hubService = hubService;
        _userManager = userManager;
        _postService = postService;
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

    [Route("{name}")]
    [HttpGet]
    [ProducesResponseType<HubDto>(StatusCodes.Status200OK)]
    public async Task<IResult> GetHubByName(string name)
    {
        var user = await _userManager.GetUserAsync(HttpContext.User);
        var result = await _hubService.GetByNameAsync(name, user);
        return result is null ? TypedResults.NotFound() : TypedResults.Ok(result);
    }

    [Route("search")]
    [HttpGet]
    [ProducesResponseType<List<HubSearchDto>>(StatusCodes.Status200OK)]
    public async Task<IResult> SearchHubs(string q)
    {
        var result = await _hubService.SearchByName(q);
        return TypedResults.Ok(result);
    }

    [Route("{name}/posts")]
    [HttpGet]
    [ProducesResponseType<HubPostsDto>(StatusCodes.Status200OK)]
    public async Task<IResult> GetHubPosts(string name,
        [FromQuery(Name = "time")] TimeSortOrder time = TimeSortOrder.Day, [FromQuery(Name = "page")] int page = 0,
        [FromQuery(Name = "sort")] SortOrder sort = SortOrder.New)
    {
        var user = await _userManager.GetUserAsync(HttpContext.User);
        var posts = await _postService.GetHubPostsAsync(name, sort, time, page, user);
        return TypedResults.Ok(new HubPostsDto() { Posts = posts.Count > 0 ? posts[..^1] : posts, HasMore = posts.Count == 21 });
    }

    [Authorize]
    [Route("{name}/join")]
    [HttpPost]
    [ProducesResponseType<SidebarHubDto>(StatusCodes.Status200OK)]
    public async Task<IResult> JoinHub(string name)
    {
        var user = await _userManager.GetUserAsync(HttpContext.User);
        if (user is null) return TypedResults.Unauthorized();
        var result = await _hubService.JoinHubAsync(name, user);
        if (result is null) return TypedResults.Conflict();
        return TypedResults.Ok(result);
    }

    [Authorize]
    [Route("{name}/leave")]
    [HttpPost]
    public async Task<IResult> LeaveHub(string name)
    {
        var user = await _userManager.GetUserAsync(HttpContext.User);
        if (user is null) return TypedResults.Unauthorized();
        var result = await _hubService.LeaveHubAsync(name, user);
        if (result) return TypedResults.Ok();
        return TypedResults.Conflict();
    }
}