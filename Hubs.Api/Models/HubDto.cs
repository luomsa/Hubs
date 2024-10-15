using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record HubDto()
{

    [Required] public string Name { get; set; } = null!;

    [Required] public string Description { get; set; } = null!;

    [Required] public int TotalMembers { get; set; }
    
    [Required] public bool IsJoined { get; set; }
    
    [Required] public DateTime CreatedAt { get; set; }
    
}