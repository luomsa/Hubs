using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record CommentDto()
{
    public required int CommentId { get; set; }

    public required string Content { get; set; }
    public required string Author { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required int PostId { get; set; }
};