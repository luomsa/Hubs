using System.ComponentModel.DataAnnotations;
using Hubs.Api.Models;

namespace Hubs.Api.Data;

public record PostCommentsDto
{
    [Required] public List<CommentDto> Comments { get; set; } = [];
    [Required] public bool HasMore { get; set; }
}