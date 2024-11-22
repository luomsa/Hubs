using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record HubPostsDto
{
    public required List<PostDto> Posts { get; set; } = [];
    public required bool HasMore { get; set; }
}