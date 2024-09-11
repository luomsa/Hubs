using Hubs.Api.Data;

namespace Hubs.Api.Services;

public class PostService: IPostService
{
    private readonly HubDbContext _context;

    public PostService(HubDbContext context)
    {
        _context = context;
    }
}