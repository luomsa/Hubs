using System.Buffers.Text;
using System.Globalization;
using System.Numerics;
using System.Text;
using Hubs.Api.Data;
using Hubs.Api.Models;
using Hubs.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Hubs.Api.Controllers;

[ApiController]
[Route("api/posts")]
public class PostController : ControllerBase
{
    private readonly IPostService _postService;
    private readonly ICommentService _commentService;
    private readonly UserManager<User> _userManager;

    public PostController(IPostService postService, UserManager<User> userManager, ICommentService commentService)
    {
        _postService = postService;
        _userManager = userManager;
        _commentService = commentService;
    }

    [Authorize]
    [Route("")]
    [HttpPost]
    [ProducesResponseType<PostDto>(StatusCodes.Status200OK)]
    public async Task<IResult> CreatePost(NewPostRequest request)
    {
        var user = await _userManager.GetUserAsync(HttpContext.User);
        if (user is null) return TypedResults.Unauthorized();
        var dto = await _postService.CreatePostAsync(request, user);
        return TypedResults.Ok(dto);
    }

    [Route("{postId}")]
    [HttpGet]
    [ProducesResponseType<PostDto>(StatusCodes.Status200OK)]
    public async Task<IResult> GetPost(int postId)
    {
        var user = await _userManager.GetUserAsync(HttpContext.User);
        //if (user is null) return TypedResults.Unauthorized();
        var post = await _postService.GetHubPostAsync(postId, user);
        if (post is null) return TypedResults.BadRequest();
        return TypedResults.Ok(post);
    }

    [Route("{postId}/comments")]
    [HttpGet]
    [ProducesResponseType<PostCommentsDto>(StatusCodes.Status200OK)]
    public async Task<IResult> GetPostComments(string postId, int page = 0)
    {
        var parsedId = int.TryParse(postId, out var id);
        if (parsedId is false) return TypedResults.BadRequest();
        var comments = await _commentService.GetPostCommentsAsync(id, page);
        return TypedResults.Ok(new PostCommentsDto() { Comments = comments.Count > 0 ? comments[..^1] : comments, HasMore = comments.Count == 21 });
    }

    [Authorize]
    [Route("{postId}/comments")]
    [HttpPost]
    [ProducesResponseType<CommentDto>(StatusCodes.Status200OK)]
    public async Task<IResult> CreatePostComment(string postId, NewCommentRequest request)
    {
        var parsedId = int.TryParse(postId, out var id);
        if (parsedId is false) return TypedResults.BadRequest();
        var user = await _userManager.GetUserAsync(HttpContext.User);
        if (user is null) return TypedResults.Unauthorized();
        var comment = await _commentService.CreateCommentAsync(id, request, user);
        return TypedResults.Ok(comment);
    }

    [Authorize]
    [Route("{postId}/vote")]
    [HttpPost]
    public async Task<IResult> VotePost(string postId, [FromQuery(Name = "type")] VoteType voteType)
    {
        var parsed = int.TryParse(postId, out int id);
        if (parsed is false) return TypedResults.BadRequest();
        var user = await _userManager.GetUserAsync(HttpContext.User);
        if (user is null) return TypedResults.Unauthorized();
        await _postService.VotePost(id, voteType, user);
        return TypedResults.Ok();
    }
}