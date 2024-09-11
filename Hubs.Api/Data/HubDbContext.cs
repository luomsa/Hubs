using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Hubs.Api.Data;

public class HubDbContext: IdentityDbContext
{
    public new DbSet<User> Users { get; set; }
    public DbSet<Hub> Hubs { get; set; }
    public DbSet<HubMember> HubMembers { get; set; }
    public HubDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<HubMember>().HasKey(hm => new { User = hm.UserId, Hub = hm.HubId });
        builder.Entity<Hub>().HasMany<HubMember>(h => h.HubMembers).WithOne(hm => hm.Hub);
        builder.Entity<User>().HasMany<HubMember>(u => u.HubMembers).WithOne(hm => hm.User);
        builder.Entity<Post>().HasMany<Comment>(p => p.Comments).WithOne(c => c.Post);
        builder.Entity<HubMember>().Property(hm => hm.JoinedAt).HasDefaultValueSql("now()");
        builder.Entity<User>().Property(u => u.CreatedAt).HasDefaultValueSql("now()");
        builder.Entity<Hub>().Property(h => h.CreatedAt).HasDefaultValueSql("now()");
        builder.Entity<HubMember>().Property(hm => hm.JoinedAt).HasDefaultValueSql("now()");
        builder.Entity<Post>().Property(p => p.CreatedAt).HasDefaultValueSql("now()");
        builder.Entity<Comment>().Property(c => c.CreatedAt).HasDefaultValueSql("now()");
    }
}