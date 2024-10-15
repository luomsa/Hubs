using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record HubSearchDto
{
     [Required] public int HubId { get; set; }
     [Required] public string Name { get; set; } = null!;
     [Required] public int TotalMembers { get; set; }
}