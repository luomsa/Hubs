using Hubs.Api.Data;
using Hubs.Api.Exceptions;
using Hubs.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Hubs.Api.Services;

public class CommentService : ICommentService
{
    private readonly HubDbContext _context;

    public CommentService(HubDbContext context)
    {
        _context = context;
    }

    public Task CreateCommentAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<CommentDto> CreateCommentAsync(int postId, NewCommentRequest request, User user)
    {
        var post = await _context.Posts.Where(p => p.PostId == postId).FirstOrDefaultAsync();
        if (post is null) throw new PostNotFoundException("No such post");
        var comment = new Comment()
        {
            Author = user,
            Content = request.Content,
            Post = post,
        };
        await _context.Comments.AddAsync(comment);
        await _context.SaveChangesAsync();
        return new CommentDto()
        {
            CommentId = comment.CommentId, PostId = comment.Post.PostId, Author = comment.Author.UserName,
            Content = comment.Content, CreatedAt = comment.CreatedAt
        };
    }

    public async Task<List<CommentDto>> GetPostCommentsAsync(int postId, int page)
    {
        return await _context.Comments.Where(c => c.Post.PostId == postId).Select(p => new CommentDto()
        {
            Author = p.Author.UserName,
            Content = p.Content,
            PostId = p.Post.PostId,
            CommentId = p.CommentId,
            CreatedAt = p.CreatedAt
        }).Skip(20 * page).Take(20).ToListAsync();
    }
}