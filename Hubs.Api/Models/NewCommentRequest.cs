using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record NewCommentRequest
{
    [Required]
    public string Content { get; set; } = null!;
}