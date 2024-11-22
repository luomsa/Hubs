using System.ComponentModel.DataAnnotations;

namespace Hubs.Api.Models;

public record HubSearchDto
{
    public required int HubId { get; set; }
    public required string Name { get; set; }
    public required int TotalMembers { get; set; }
}