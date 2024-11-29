using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Hubs.Api.Data;

public class HubDbContext: IdentityDbContext
{
    public new DbSet<User> Users { get; set; }
    public DbSet<Hub> Hubs { get; set; }
    public DbSet<HubMember> HubMembers { get; set; }
    
    public DbSet<Post> Posts { get; set; }
    
    public DbSet<Comment> Comments { get; set; }
    public DbSet<PostVote> PostVotes { get; set; }
    public HubDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<HubMember>().HasKey(hm => new { User = hm.UserId, Hub = hm.HubId });
        builder.Entity<PostVote>().HasKey(pv => new { User = pv.UserId, Post = pv.PostId });
        builder.Entity<Hub>().HasMany<HubMember>(h => h.HubMembers).WithOne(hm => hm.Hub);
        builder.Entity<Hub>().HasMany<Post>(h => h.Posts).WithOne(p => p.Hub);
        builder.Entity<User>().HasMany<HubMember>(u => u.HubMembers).WithOne(hm => hm.User);
        builder.Entity<User>().HasMany<Post>(u => u.Posts).WithOne(p => p.Author);
        builder.Entity<User>().HasMany<Comment>(u => u.Comments).WithOne(c => c.Author);
        builder.Entity<User>().HasMany<PostVote>(u => u.PostVotes).WithOne(pv => pv.User);
        builder.Entity<Post>().HasMany<Comment>(p => p.Comments).WithOne(c => c.Post);
        builder.Entity<Post>().HasMany<PostVote>(p => p.PostVotes).WithOne(pv => pv.Post);
        builder.Entity<HubMember>().Property(hm => hm.JoinedAt).HasDefaultValueSql("now()");
        builder.Entity<User>().Property(u => u.CreatedAt).HasDefaultValueSql("now()");
        builder.Entity<Hub>().Property(h => h.CreatedAt).HasDefaultValueSql("now()");
        builder.Entity<HubMember>().Property(hm => hm.JoinedAt).HasDefaultValueSql("now()");
        builder.Entity<Post>().Property(p => p.CreatedAt).HasDefaultValueSql("now()");
        builder.Entity<Comment>().Property(c => c.CreatedAt).HasDefaultValueSql("now()");
        builder.Entity<PostVote>().Property(pv => pv.VotedAt).HasDefaultValueSql("now()");
        builder.Entity<User>().Property(u => u.UserName).IsRequired();
        builder.Entity<User>().Property(u => u.NormalizedUserName).IsRequired();
        builder.Entity<Post>().Property(p => p.Type).HasConversion<string>();
        builder.Entity<Post>().Property(p => p.IsDeleted).HasDefaultValue(false);
        builder.Entity<PostVote>().Property(pv => pv.VoteType).HasConversion<string>();
    }
}