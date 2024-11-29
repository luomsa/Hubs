using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record SidebarHubDto()
{
    public required int HubId { get; set; }
    public required string Name { get; set; }

    public required bool IsModerator { get; set; }
};