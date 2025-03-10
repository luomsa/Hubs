using Hubs.Api.Data;
using Hubs.Api.Models;

namespace Hubs.Api.Services;

public interface IUserService
{
    public Task<List<SidebarHubDto>> GetJoinedHubs(User user);
    public Task<List<PostDto>> GetUserPosts(User user, SortOrder sort, TimeSortOrder time, int page);
}