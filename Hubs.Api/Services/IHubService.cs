using Hubs.Api.Data;
using Hubs.Api.Models;

namespace Hubs.Api.Services;

public interface IHubService
{
    public Task CreateAsync(NewHubRequest request, User user);
    public Task<HubDto?> GetByNameAsync(string name);
}