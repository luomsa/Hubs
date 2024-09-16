namespace Hubs.Api.Exceptions;

public class HubNotFoundException : Exception
{
    public HubNotFoundException(string? message) : base(message)
    {
    }
}