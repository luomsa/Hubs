using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record UserDto()
{
    [Required] public string Username { get; init; } = null!;
    [Required] public string UserId { get; init; } = null!;
};