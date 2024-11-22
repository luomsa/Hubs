using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record PostCommentsDto
{
    public required List<CommentDto> Comments { get; set; } = [];
    public required bool HasMore { get; set; }
}