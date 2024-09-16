using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record HubDto()
{

    [Required] public string Name { get; set; } = null!;

    [Required] public string Description { get; set; } = null!;

    [Required] public int TotalMembers { get; set; }
}