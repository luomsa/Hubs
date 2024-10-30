using System.ComponentModel.DataAnnotations;
using Hubs.Api.Models;

namespace Hubs.Api.Data;

public record HubPostsDto
{
    [Required] public List<PostDto> Posts { get; set; } = [];
    [Required] public bool HasMore { get; set; }
}