using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record SidebarHubDto()
{
    public int HubId { get; set; }
    public required string Name { get; set; }
};