using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record UserDto()
{
    public required string Username { get; init; }
    public required string UserId { get; init; }
    public required ICollection<SidebarHubDto> JoinedHubs { get; set; } = [];
};