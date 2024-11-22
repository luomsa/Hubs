using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record HubDto()
{
    public required string Name { get; set; }

    public required string Description { get; set; } 
    public required int TotalMembers { get; set; }

    public required bool IsJoined { get; set; }

    public required DateTime CreatedAt { get; set; }
}