using Hubs.Api.Data;
using Hubs.Api.Models;

namespace Hubs.Api.Services;

public interface IPostService
{
    public Task<NewPostDto> CreatePostAsync(NewPostRequest request, User user);
    public Task<List<PostDto>> GetHubPostsAsync(string hubName);
    public Task<PostDto?> GetHubPostAsync(int postId);
}