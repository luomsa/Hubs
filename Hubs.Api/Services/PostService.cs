using System.Text.RegularExpressions;
using Hubs.Api.Data;
using Hubs.Api.Exceptions;
using Hubs.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Hubs.Api.Services;

public partial class PostService: IPostService
{
    private readonly HubDbContext _context;
    public PostService(HubDbContext context)
    {
        _context = context;
    }

    public async Task<NewPostDto> CreatePostAsync(NewPostRequest request, User user)
    {
        var hub = await _context.Hubs.FirstOrDefaultAsync(h => h.Name == request.HubName);
        if (hub is null) throw new HubNotFoundException("No such hub");
        var cleanedTitle = SlugRegex().Replace(request.Title, "");
        cleanedTitle = cleanedTitle.Length > 40 ? cleanedTitle[..40] : cleanedTitle;

        var slug = HyphenRegex().Replace(cleanedTitle.ToLower().Trim(), "-");
        Console.WriteLine(request.Type);
        var post = new Post()
        {
            Author = user,
            Title = request.Title,
            Content = request.Content,
            Slug = slug,
            Hub = hub,
            Type = request.Type
        };
        await _context.Posts.AddAsync(post);
        await _context.SaveChangesAsync();
        return new NewPostDto { PostId = post.PostId, Slug = slug, Type = post.Type};
    }

    public async Task<List<PostDto>> GetHubPostsAsync(string hubName)
    {
       return await _context.Posts.Where(p => p.Hub.Name == hubName).Select(p => new PostDto()
       {
           Author = new UserDto() {UserId = p.Author.Id, Username = p.Author.UserName},
           Title = p.Title,
           Content = p.Content,
           TotalLikes = 0,
           Slug = p.Slug,
           PostId = p.PostId,
           Type = p.Type,
           Hub = p.Hub.Name,
           CreatedAt = p.CreatedAt,
       }).ToListAsync();
    }

    public async Task<PostDto?> GetHubPostAsync(int postId)
    {
        return await _context.Posts.Where(p => p.PostId == postId).Select(p => new PostDto()
        {
            Author = new UserDto() { UserId = p.Author.Id, Username = p.Author.UserName },
            Title = p.Title,
            Content = p.Content,
            TotalLikes = 0,
            Slug = p.Slug,
            PostId = p.PostId,
            Type = p.Type,
            Hub = p.Hub.Name,
            CreatedAt = p.CreatedAt
        }).FirstOrDefaultAsync();
    }

    [GeneratedRegex("[^a-zA-Z ]")]
    private static partial Regex SlugRegex();
    [GeneratedRegex(@"\s+")]
    private static partial Regex HyphenRegex();
}