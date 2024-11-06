using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record PostCommentsDto
{
    [Required] public List<CommentDto> Comments { get; set; } = [];
    [Required] public bool HasMore { get; set; }
}