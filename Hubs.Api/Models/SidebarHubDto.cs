using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record SidebarHubDto()
{
    [Required] public int HubId { get; set; }
    [Required] public string Name { get; set; } = null!;
};