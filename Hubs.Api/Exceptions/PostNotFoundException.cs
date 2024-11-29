namespace Hubs.Api.Exceptions;

public class PostNotFoundException(string? message) : Exception(message);