namespace Hubs.Api.Data;

public class Comment
{
    public int CommentId { get; set; }
    public required string Content { get; set; }
    public required User Author { get; set; }
    public DateTime CreatedAt { get; set; }
    public required Post Post { get; set; }
}