using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record AuthRequest()
{
    [Required]
    [MinLength(3)]
    [MaxLength(20)]
    public string Username { get; set; } = null!;

    [Required]
    [MinLength(8)]
    [MaxLength(50)]
    public string Password { get; set; } = null!;
};