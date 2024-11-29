using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Hubs.Api.Data;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Hubs.Api.Models;

public record PostDto([Required] string Hub, [Required] int PostId, [Required] string Slug)
{
    public required string Title { get; set; }
    public required string Content { get; set; }
    public PostUserDto? Author { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required int VoteCount { get; set; }
    public VoteType? UserVoteType { get; set; }

    [Required] public string Url { get; init; } = $"/hub/{Hub}/{PostId}/{Slug}";
    public required PostType Type { get; set; }
}