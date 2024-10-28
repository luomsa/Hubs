using Hubs.Api.Data;
using Hubs.Api.Models;

namespace Hubs.Api.Services;

public interface IPostService
{
    public Task<NewPostDto> CreatePostAsync(NewPostRequest request, User user);
    public Task<List<PostDto>> GetHubPostsAsync(string hubName, SortOrder sort, TimeSortOrder time, int page, User? user);
    public Task<PostDto?> GetHubPostAsync(int postId, User? user);
    public Task VotePost(int postId, VoteType voteType, User user);

    public Task<List<PostDto>> GetHomeFeedPosts(User user, SortOrder sort, TimeSortOrder time, int page);
    public Task<List<PostDto>> GetPopularFeedPosts(User? user, SortOrder sort, TimeSortOrder time, int page);

}