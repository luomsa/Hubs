namespace Hubs.Api.Data;

public class HubMember
{
    public required string UserId { get; set; }
    public int HubId { get; set; }
    public required Hub Hub { get; set; }
    public required User User { get; set; }
    public bool IsModerator { get; set; }
    public DateTime JoinedAt { get; set; }
}