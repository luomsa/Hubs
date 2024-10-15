using System.Text.Json.Serialization;

namespace Hubs.Api.Data;

public class PostVote
{
    public int VoteId { get; set; }
    public VoteType VoteType { get; set; }
    public required Post Post { get; set; } 
    public int PostId { get; set; }
    public required User User { get; set; } 
    public required string UserId { get; set; }
    public DateTime VotedAt { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum VoteType
{
    Like,
    Dislike
}