using Hubs.Api.Data;
using Hubs.Api.Exceptions;
using Hubs.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Hubs.Api.Services;

public class HubService : IHubService
{
    private readonly HubDbContext _context;
    private readonly IHttpContextAccessor _accessor;

    public HubService(HubDbContext context, IHttpContextAccessor accessor)
    {
        _context = context;
        _accessor = accessor;
    }

    public async Task CreateAsync(NewHubRequest request, User user)
    {
        var exists = await _context.Hubs.FirstOrDefaultAsync(h => h.Name.ToLower().Equals(request.Name.ToLower()));
        if (exists is not null) throw new HubExistsException("Hub with that name already exists");
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var hub = new Hub()
            {
                Name = request.Name.ToLower(),
                Description = request.Description
            };
            await _context.Hubs.AddAsync(hub);
            await _context.SaveChangesAsync();
            var hubMember = new HubMember()
            {
                User = user,
                UserId = user.Id,
                Hub = hub,
                IsModerator = true
            };
            await _context.HubMembers.AddAsync(hubMember);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch (Exception e)
        {
            throw;
        }
    }

    public async Task<HubDto?> GetByNameAsync(string name)
    {
        return await _context.Hubs.Where(hub => hub.Name.ToLower().Equals(name.ToLower())).Select(hub => new HubDto(hub.Name, hub.Description, hub.HubMembers.Count)).FirstOrDefaultAsync();
    }
}