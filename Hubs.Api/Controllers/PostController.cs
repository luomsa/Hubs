﻿using System.Buffers.Text;
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
    public async Task<IResult> GetPost(string postId)
    {
        var parsedId = int.TryParse(postId, out var id);
        if (parsedId is false) return TypedResults.BadRequest();
        var user = await _userManager.GetUserAsync(HttpContext.User);
        //if (user is null) return TypedResults.Unauthorized();
        var dto = await _postService.GetHubPostAsync(id);
        if (dto is null) return TypedResults.BadRequest();
        return TypedResults.Ok(dto);
    }

    [Route("{postId}/comments")]
    [HttpGet]
    [ProducesResponseType<List<CommentDto>>(StatusCodes.Status200OK)]
    public async Task<IResult> GetPostComments(string postId)
    {
        var parsedId = int.TryParse(postId, out var id);
        if (parsedId is false) return TypedResults.BadRequest();
        var comment = await _commentService.GetPostCommentsAsync(id);
        return TypedResults.Ok(comment);
    }
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
}