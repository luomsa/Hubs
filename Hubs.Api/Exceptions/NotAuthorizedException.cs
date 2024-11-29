namespace Hubs.Api.Exceptions;

public class NotAuthorizedException(string? message) : Exception(message);