using Hubs.Api.Data;
using Hubs.Api.Models;

namespace Hubs.Api.Services;

public interface ICommentService
{
    public Task<CommentDto> CreateCommentAsync(int postId, NewCommentRequest request, User user);
    public Task<List<CommentDto>> GetPostCommentsAsync(int postId, int page);
}