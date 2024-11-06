using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record HubPostsDto
{
    [Required] public List<PostDto> Posts { get; set; } = [];
    [Required] public bool HasMore { get; set; }
}