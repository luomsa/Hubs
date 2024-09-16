using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record CommentDto()
{
    [Required]
    public int CommentId { get; set; }
    [Required]
    public string Content { get; set; }
    [Required]
    public string Author { get; set; }
    [Required]
    public DateTime CreatedAt { get; set; }
    [Required]
    public int PostId { get; set; }
};