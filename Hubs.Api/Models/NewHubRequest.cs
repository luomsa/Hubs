using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record NewHubRequest()
{
    [Required]
    [MinLength(3)]
    [MaxLength(20)]
    [RegularExpression("^[a-zA-Z0-9]+$")]
    public string Name { get; set; } = null!;

    [Required]
    [MinLength(1)]
    [MaxLength(500)]
    public string Description { get; set; } = null!;
};