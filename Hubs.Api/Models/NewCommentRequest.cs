using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record NewCommentRequest
{
    [Required]
    [MinLength(1)]
    [MaxLength(1000)]
    public string Content { get; set; } = null!;
}