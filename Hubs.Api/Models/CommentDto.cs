using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record CommentDto()
{
    [Required]
    public int CommentId { get; set; }

    [Required] public string Content { get; set; } = null!;
    [Required] public string Author { get; set; } = null!;
    [Required]
    public DateTime CreatedAt { get; set; }
    [Required]
    public int PostId { get; set; }
};