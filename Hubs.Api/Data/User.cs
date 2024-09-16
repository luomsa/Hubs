using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Hubs.Api.Data;

public class User : IdentityUser
{
#pragma warning disable CS8765 // Nullability of type of parameter doesn't match overridden member (possibly because of nullability attributes).
    public override required string UserName
    {
        get => base.UserName ?? throw new InvalidOperationException("UserName cannot be null.");
        set => base.UserName = value ?? throw new ArgumentNullException(nameof(value), "UserName cannot be null.");
    }

    public override string NormalizedUserName
    {
        get => base.NormalizedUserName ?? throw new InvalidOperationException("NormalizedUserName cannot be null.");

        set => base.NormalizedUserName =
            value ?? throw new ArgumentNullException(nameof(value), "NormalizedUserName cannot be null.");
    }
#pragma warning restore CS8765 // Nullability of type of parameter doesn't match overridden member (possibly because of nullability attributes).

    public DateTime CreatedAt { get; set; }
    public ICollection<HubMember> HubMembers { get; set; } = [];
    public ICollection<Post> Posts { get; set; } = [];
    public ICollection<Comment> Comments { get; set; } = [];
}