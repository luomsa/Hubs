using Hubs.Api.Data;
using Hubs.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Hubs.Api.Services;

public class UserService : IUserService
{
    private readonly HubDbContext _context;

    public UserService(HubDbContext context)
    {
        _context = context;
    }

    public async Task<List<SidebarHubDto>> GetJoinedHubs(User user)
    {
        return await _context.HubMembers.Where(hm => hm.User.Id == user.Id)
            .Select(h => new SidebarHubDto() { HubId = h.HubId, Name = h.Hub.Name, IsModerator = h.IsModerator })
            .ToListAsync();
    }

    public async Task<List<PostDto>> GetUserPosts(User user, SortOrder sort, TimeSortOrder time, int page)
    {
        var timeFilter = HubsUtils.SortByTime(time);

        var posts = sort switch
        {
            SortOrder.New => _context.Posts.Where(u => u.Author.Id == user.Id).OrderByDescending(p => p.CreatedAt),
            SortOrder.Top => _context.Posts.Where(u => u.Author.Id == user.Id).Where(p => p.CreatedAt >= timeFilter)
                .OrderByDescending(p => p.PostVotes.Count(pv => pv.VoteType == VoteType.Like) -
                                        p.PostVotes.Count(pv => pv.VoteType == VoteType.Dislike)),
            _ => throw new ArgumentOutOfRangeException(nameof(sort), sort, null)
        };
        return await posts.Where(p => !p.IsDeleted).Select(p => new PostDto(p.Hub.Name, p.PostId, p.Slug)
        {
            Author = new PostUserDto { UserId = p.Author.Id, Username = p.Author.UserName },
            Title = p.Title,
            Content = p.Content,
            Type = p.Type,
            CreatedAt = p.CreatedAt,
            UserVoteType = p.PostVotes.Where(pv => pv.User == user).Select(pv => (VoteType?)pv.VoteType)
                .FirstOrDefault(),
            VoteCount = p.PostVotes.Count(pv => pv.VoteType == VoteType.Like) -
                        p.PostVotes.Count(pv => pv.VoteType == VoteType.Dislike)
        }).Skip(20 * page).Take(21).ToListAsync();
    }
}