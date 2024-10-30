using Hubs.Api.Data;
using Hubs.Api.Models;
using Hubs.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Hubs.Api.Controllers;

[ApiController]
[Route("api/feed")]
public class FeedController : ControllerBase
{
    private readonly IPostService _postService;
    private readonly UserManager<User> _userManager;

    public FeedController(IPostService postService, UserManager<User> userManager)
    {
        _postService = postService;
        _userManager = userManager;
    }

    [Route("home")]
    [HttpGet]
    [Authorize]
    [ProducesResponseType<HubPostsDto>(StatusCodes.Status200OK)]
    public async Task<IResult> GetHomeFeed([FromQuery(Name = "time")] TimeSortOrder time = TimeSortOrder.Day, [FromQuery(Name = "page")] int page = 0,
        [FromQuery(Name = "sort")] SortOrder sort = SortOrder.New)
    {
        var user = await _userManager.GetUserAsync(HttpContext.User);
        if (user is null) return TypedResults.Unauthorized();
        var posts = await _postService.GetHomeFeedPosts(user, sort, time, page);
        return TypedResults.Ok(new HubPostsDto() {Posts = posts, HasMore = posts.Count == 21});
    }
    [Route("popular")]
    [HttpGet]
    [ProducesResponseType<HubPostsDto>(StatusCodes.Status200OK)]
    public async Task<IResult> GetPopularFeed([FromQuery(Name = "time")] TimeSortOrder time = TimeSortOrder.Day, [FromQuery(Name = "page")] int page = 0,
        [FromQuery(Name = "sort")] SortOrder sort = SortOrder.New)
    {
        var user = await _userManager.GetUserAsync(HttpContext.User);
        var posts = await _postService.GetPopularFeedPosts(user, sort, time, page);
        return TypedResults.Ok(new HubPostsDto() { Posts = posts, HasMore = posts.Count == 21 });
    }

  
}