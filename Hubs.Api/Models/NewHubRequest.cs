using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record NewHubRequest()
{
    [Required]
    [MinLength(3)]
    [MaxLength(20)]
    [RegularExpression("([a-zA-Z\\s]+)")]
    public string Name { get; set; } = null!;

    [Required]
    [MinLength(1)]
    [MaxLength(255)]
    public string Description { get; set; } = null!;
};