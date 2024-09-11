using Microsoft.AspNetCore.Identity;

namespace Hubs.Api.Data;

public class User: IdentityUser
{
    public DateTime CreatedAt { get; set; }
    public ICollection<HubMember> HubMembers { get; set; } = [];

}