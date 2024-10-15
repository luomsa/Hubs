using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Hubs.Api.Data;

public class Post
{
    public int PostId { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }

    public required string Slug { get; set; }
    public required User Author { get; set; }
    public DateTime CreatedAt { get; set; }
    public PostType Type { get; set; }
    public required Hub Hub { get; set; }
    public ICollection<Comment> Comments { get; set; } = [];
    public ICollection<PostVote> PostVotes { get; set; } = [];
}    
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum PostType
{
    Text,
    Image
}