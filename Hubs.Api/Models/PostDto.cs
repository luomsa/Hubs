using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Hubs.Api.Data;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Hubs.Api.Models;

public record PostDto
{
    [Required] public string Title { get; set; } = null!;
    [Required] public string Content { get; set; } = null!;
    [Required] public string Slug { get; set; } = null!;
    [Required] public UserDto Author { get; set; } = null!;
    [Required] public int TotalLikes { get; set; }
    [Required] public int PostId { get; set; }
    [Required] public DateTime CreatedAt { get; set; }

    [Required] public string Hub { get; set; } = null!;
    [Required] public string Url => $"/hub/{Hub}/{PostId}/{Slug}";
    [Required] public PostType Type { get; set; }

}