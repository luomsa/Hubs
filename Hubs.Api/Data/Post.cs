namespace Hubs.Api.Data;

public class Post
{
    public int PostId { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public required User Author { get; set; }
    public DateTime CreatedAt { get; set; }
    public ICollection<Comment> Comments { get; set; } = [];
}