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
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<HubDto?> GetByNameAsync(string name, User? user)
    {
        if (user is null)
        {
            return await _context.Hubs.Where(hub => hub.Name.ToLower().Equals(name.ToLower())).Select(hub =>
                new HubDto()
                {
                    Name = hub.Name, Description = hub.Description, TotalMembers = hub.HubMembers.Count,
                    IsJoined = false,
                    CreatedAt = hub.CreatedAt,
                }).FirstOrDefaultAsync();
        }

        return await _context.Hubs.Where(hub => hub.Name.ToLower().Equals(name.ToLower())).Select(hub => new HubDto()
        {
            Name = hub.Name, Description = hub.Description, TotalMembers = hub.HubMembers.Count,
            IsJoined = hub.HubMembers.FirstOrDefault(hm => hm.UserId == user.Id) != null,
            CreatedAt = hub.CreatedAt,
        }).FirstOrDefaultAsync();
    }

    public async Task<SidebarHubDto?> JoinHubAsync(string name, User user)
    {
        var userHub =
            _context.HubMembers.FirstOrDefault(hm =>
                hm.UserId == user.Id && hm.Hub.Name.ToLower().Equals(name.ToLower()));
        if (userHub is not null) return null;
        var hub = _context.Hubs.FirstOrDefault(h => h.Name.ToLower().Equals(name.ToLower()));
        if (hub is null) throw new HubNotFoundException("Hub with that name doesn't exist");
        var hubMember = new HubMember()
        {
            User = user,
            UserId = user.Id,
            Hub = hub,
            HubId = hub.HubId
        };
        await _context.HubMembers.AddAsync(hubMember);
        await _context.SaveChangesAsync();
        return new SidebarHubDto() { Name = hub.Name, HubId = hub.HubId, IsModerator = false};
    }

    public async Task<bool> LeaveHubAsync(string name, User user)
    {
        var userHub =
            _context.HubMembers.FirstOrDefault(hm =>
                hm.UserId == user.Id && hm.Hub.Name.ToLower().Equals(name.ToLower()));
        if (userHub is null) return await Task.FromResult(false);
        _context.HubMembers.Remove(userHub);
        await _context.SaveChangesAsync();
        return await Task.FromResult(true);
    }

    public Task<List<HubSearchDto>> SearchByName(string name)
    {
        var hubs = _context.Hubs.Where(h => h.Name.ToLower().Contains(name.ToLower()))
            .Select(h => new HubSearchDto() { HubId = h.HubId, Name = h.Name, TotalMembers = h.HubMembers.Count() }).Take(10).ToListAsync();
        return hubs;
    }
}