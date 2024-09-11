namespace Hubs.Api.Exceptions;

public class HubExistsException : Exception
{
    public HubExistsException(string? message) : base(message)
    {
    }
}