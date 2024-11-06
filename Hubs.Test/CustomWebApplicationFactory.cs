using System.Security.Claims;
using Hubs.Api.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Testcontainers.PostgreSql;

namespace Hubs.Test;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    private readonly PostgreSqlContainer _container;
    private readonly string _testUsername = "testuser";
    private readonly string _testPassword = "Test123321!";

    public CustomWebApplicationFactory()
    {
        _container = new PostgreSqlBuilder().WithImage("postgres:17.0-alpine").WithDatabase("postgres")
            .WithUsername("postgres")
            .WithPassword("postgres").Build();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        _container.StartAsync().GetAwaiter().GetResult();
        builder.ConfigureTestServices(services =>
        {
            var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<HubDbContext>));
            if (descriptor is not null)
            {
                services.Remove(descriptor);
            }

            services.AddDbContext<HubDbContext>(db => db.UseNpgsql(_container.GetConnectionString()));
            var sp = services.BuildServiceProvider();
            using var scope = sp.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<HubDbContext>();
            var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher<User>>();
            db.Database.Migrate();
            SeedTestUser(db, passwordHasher);
        });
        base.ConfigureWebHost(builder);
    }

    private void SeedTestUser(HubDbContext db, IPasswordHasher<User> passwordHasher)
    {
        if (db.Users.Any(u => u.UserName == _testUsername)) return;
        var user = new User()
        {
            Id = "7102dc8d-0fec-466d-ae71-6995316233b1", UserName = _testUsername,
            NormalizedUserName = _testUsername.ToUpper()
        };
        user.PasswordHash = passwordHasher.HashPassword(user, _testPassword);
        db.Users.Add(user);
        db.SaveChanges();
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            _container.DisposeAsync().GetAwaiter().GetResult();
        }

        base.Dispose(disposing);
    }
}