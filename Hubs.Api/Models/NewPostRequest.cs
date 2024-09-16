using System.ComponentModel.DataAnnotations;
using Hubs.Api.Data;

namespace Hubs.Api.Models;

public record NewPostRequest
{
    [Required]
    [MinLength(1)]
    [MaxLength(100)]
    public string Title { get; set; } = null!;

    [Required]
    [MinLength(1)]
    [MaxLength(1000)]
    public string Content { get; set; } = null!;
    [Required]
    public string HubName { get; set; } = null!;
    [Required]
    public PostType Type { get; set; }
}