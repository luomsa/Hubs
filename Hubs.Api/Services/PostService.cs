using System.Text.RegularExpressions;
using Hubs.Api.Data;
using Hubs.Api.Exceptions;
using Hubs.Api.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Hubs.Api.Services;

public partial class PostService : IPostService
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
        return new NewPostDto { PostId = post.PostId, Slug = slug, Type = post.Type };
    }

    public async Task<List<PostDto>> GetHubPostsAsync(string hubName, SortOrder sort, TimeSortOrder time, int page,
        User? user)
    {
        var timeFilter = time switch
        {
            TimeSortOrder.Hour => DateTime.UtcNow.AddHours(-1),
            TimeSortOrder.Day => DateTime.UtcNow.AddDays(-1),
            TimeSortOrder.Week => DateTime.UtcNow.AddDays(-7),
            TimeSortOrder.Month => DateTime.UtcNow.AddMonths(-1),
            TimeSortOrder.Year => DateTime.UtcNow.AddYears(-1),
            TimeSortOrder.AllTime => DateTime.MinValue,
            _ => throw new ArgumentOutOfRangeException(nameof(time), time, null)
        };
        var posts = _context.Posts.Where(p => p.Hub.Name == hubName);
        posts = sort switch
        {
            SortOrder.New => posts.OrderByDescending(p => p.CreatedAt),
            SortOrder.Top => posts.Where(p => p.CreatedAt >= timeFilter).OrderByDescending(p =>
                p.PostVotes.Count(pv => pv.VoteType == VoteType.Like) -
                p.PostVotes.Count(pv => pv.VoteType == VoteType.Dislike)),
            _ => throw new ArgumentOutOfRangeException(nameof(sort), sort, null)
        };
        return await posts.Select(p => new PostDto()
        {
            Author = new PostUserDto { UserId = p.Author.Id, Username = p.Author.UserName },
            Title = p.Title,
            Content = p.Content,
            Slug = p.Slug,
            PostId = p.PostId,
            Type = p.Type,
            Hub = p.Hub.Name,
            CreatedAt = p.CreatedAt,
            UserVoteType = p.PostVotes.Where(pv => pv.User == user).Select(pv => (VoteType?)pv.VoteType)
                .FirstOrDefault(),
            VoteCount = p.PostVotes.Count(pv => pv.VoteType == VoteType.Like) -
                        p.PostVotes.Count(pv => pv.VoteType == VoteType.Dislike)
        }).Skip(20 * page).Take(21).ToListAsync();
    }

    public async Task<PostDto?> GetHubPostAsync(int postId, User? user)
    {
        return await _context.Posts.Where(p => p.PostId == postId).Select(p => new PostDto()
        {
            Author = new PostUserDto { UserId = p.Author.Id, Username = p.Author.UserName },
            Title = p.Title,
            Content = p.Content,
            Slug = p.Slug,
            PostId = p.PostId,
            Type = p.Type,
            Hub = p.Hub.Name,
            CreatedAt = p.CreatedAt,
            UserVoteType = p.PostVotes.Where(pv => pv.User == user).Select(pv => (VoteType?)pv.VoteType)
                .FirstOrDefault(),
            VoteCount = p.PostVotes.Count(pv => pv.VoteType == VoteType.Like) -
                        p.PostVotes.Count(pv => pv.VoteType == VoteType.Dislike)
        }).FirstOrDefaultAsync();
    }

    public async Task VotePost(int postId, VoteType voteType, User user)
    {
        var hasVoted = await _context.PostVotes.FirstOrDefaultAsync(v => v.Post.PostId == postId && v.User == user);
        if (hasVoted is not null) throw new VoteException("User has already voted!");
        var post = await _context.Posts.FirstOrDefaultAsync(p => p.PostId == postId);
        if (post is null) throw new PostNotFoundException("Post not found!");
        var vote = new PostVote()
        {
            Post = post,
            PostId = post.PostId,
            User = user,
            UserId = user.Id,
            VoteType = voteType
        };
        await _context.PostVotes.AddAsync(vote);
        await _context.SaveChangesAsync();
    }

    public async Task<List<PostDto>> GetHomeFeedPosts(User user, SortOrder sort, TimeSortOrder time, int page)
    {
        var timeFilter = time switch
        {
            TimeSortOrder.Hour => DateTime.UtcNow.AddHours(-1),
            TimeSortOrder.Day => DateTime.UtcNow.AddDays(-1),
            TimeSortOrder.Week => DateTime.UtcNow.AddDays(-7),
            TimeSortOrder.Month => DateTime.UtcNow.AddMonths(-1),
            TimeSortOrder.Year => DateTime.UtcNow.AddYears(-1),
            TimeSortOrder.AllTime => DateTime.MinValue,
            _ => throw new ArgumentOutOfRangeException(nameof(time), time, null)
        };
        var joinedHubs = _context.Users
            .Where(u => u == user)
            .SelectMany(u => u.HubMembers.Select(hm => hm.Hub))
            .Include(h => h.Posts);

        var posts = sort switch
        {
            SortOrder.New => joinedHubs.SelectMany(h => h.Posts).OrderByDescending(p => p.CreatedAt),
            SortOrder.Top => joinedHubs.SelectMany(h => h.Posts).Where(p => p.CreatedAt >= timeFilter)
                .OrderByDescending(p => p.PostVotes.Count(pv => pv.VoteType == VoteType.Like) -
                                        p.PostVotes.Count(pv => pv.VoteType == VoteType.Dislike)),
            _ => throw new ArgumentOutOfRangeException(nameof(sort), sort, null)
        };
        return await posts.Select(p => new PostDto()
        {
            Author = new PostUserDto { UserId = p.Author.Id, Username = p.Author.UserName },
            Title = p.Title,
            Content = p.Content,
            Slug = p.Slug,
            PostId = p.PostId,
            Type = p.Type,
            Hub = p.Hub.Name,
            CreatedAt = p.CreatedAt,
            UserVoteType = p.PostVotes.Where(pv => pv.User == user).Select(pv => (VoteType?)pv.VoteType)
                .FirstOrDefault(),
            VoteCount = p.PostVotes.Count(pv => pv.VoteType == VoteType.Like) -
                        p.PostVotes.Count(pv => pv.VoteType == VoteType.Dislike)
        }).Skip(20 * page).Take(21).ToListAsync();
    }


    public async Task<List<PostDto>> GetPopularFeedPosts(User? user, SortOrder sort, TimeSortOrder time, int page)
    {
        var timeFilter = time switch
        {
            TimeSortOrder.Hour => DateTime.UtcNow.AddHours(-1),
            TimeSortOrder.Day => DateTime.UtcNow.AddDays(-1),
            TimeSortOrder.Week => DateTime.UtcNow.AddDays(-7),
            TimeSortOrder.Month => DateTime.UtcNow.AddMonths(-1),
            TimeSortOrder.Year => DateTime.UtcNow.AddYears(-1),
            TimeSortOrder.AllTime => DateTime.MinValue,
            _ => throw new ArgumentOutOfRangeException(nameof(time), time, null)
        };


        var posts = sort switch
        {
            SortOrder.New => _context.Posts.OrderByDescending(p => p.CreatedAt),
            SortOrder.Top => _context.Posts.Where(p => p.CreatedAt >= timeFilter).OrderByDescending(p =>
                p.PostVotes.Count(pv => pv.VoteType == VoteType.Like) -
                p.PostVotes.Count(pv => pv.VoteType == VoteType.Dislike)),
            _ => throw new ArgumentOutOfRangeException(nameof(sort), sort, null)
        };
        return await posts.Select(p => new PostDto()
        {
            Author = new PostUserDto { UserId = p.Author.Id, Username = p.Author.UserName },
            Title = p.Title,
            Content = p.Content,
            Slug = p.Slug,
            PostId = p.PostId,
            Type = p.Type,
            Hub = p.Hub.Name,
            CreatedAt = p.CreatedAt,
            UserVoteType = p.PostVotes.Where(pv => pv.User == user).Select(pv => (VoteType?)pv.VoteType)
                .FirstOrDefault(),
            VoteCount = p.PostVotes.Count(pv => pv.VoteType == VoteType.Like) -
                        p.PostVotes.Count(pv => pv.VoteType == VoteType.Dislike)
        }).Skip(20 * page).Take(21).ToListAsync();
    }

    [GeneratedRegex("[^a-zA-Z ]")]
    private static partial Regex SlugRegex();

    [GeneratedRegex(@"\s+")]
    private static partial Regex HyphenRegex();
}