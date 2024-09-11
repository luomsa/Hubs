namespace Hubs.Api.Data;

public class Hub
{
    public int HubId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public ICollection<HubMember> HubMembers { get; set; } = [];
}