namespace Hubs.Api.Models;

public record PostUserDto
{
    public required string UserId { get; set; }
    public required string Username { get; set; }
};