namespace Hubs.Api.Exceptions;

public class VoteException : Exception
{
    public VoteException(string? message) : base(message)
    {
    }
}