using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Hubs.Api.Data;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Hubs.Api.Models;

public record PostDto
{
    public required string Title { get; set; }
    public required string Content { get; set; }
    public required string Slug { get; set; }
    public required PostUserDto Author { get; set; }
    public required int PostId { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required int VoteCount { get; set; }
    public VoteType? UserVoteType { get; set; }
    public required string Hub { get; set; }
    public string Url => $"/hub/{Hub}/{PostId}/{Slug}";
    public required PostType Type { get; set; }
}