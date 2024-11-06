using System.Net;
using System.Net.Http.Json;
using Hubs.Api.Models;

namespace Hubs.Test;

public class AuthControllerTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly CustomWebApplicationFactory _factory;

    public AuthControllerTests(CustomWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Register_WhenCalledWithInvalidValues_ReturnsBadRequest()
    {
        var client = _factory.CreateClient();
        var request = new AuthRequest() { Username = "test", Password = "test" };
        var response = await client.PostAsJsonAsync("api/auth/register", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
    [Fact]
    public async Task Register_WhenCalledWithExistingUsername_ReturnsConflict()
    {
        var client = _factory.CreateClient();
        var request = new AuthRequest() { Username = "testuser", Password = "test123321" };
        var response = await client.PostAsJsonAsync("api/auth/register", request);
        Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
    }

    [Fact]
    public async Task Register_WhenCalledWithValidValues_ReturnsOk()
    {
        var client = _factory.CreateClient();
        var request = new AuthRequest() { Username = "test", Password = "test123321" };
        var response = await client.PostAsJsonAsync("api/auth/register", request);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
    [Fact]
    public async Task Login_WhenCalledWithValidValues_ReturnsOk()
    {
        var client = _factory.CreateClient();
        var request = new AuthRequest() { Username = "testuser", Password = "Test123321!" };
        var response = await client.PostAsJsonAsync("api/auth/login", request);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
    
    [Fact]
    public async Task Login_WhenCalledWithInvalidValues_ReturnsUnauthorized()
    {
        var client = _factory.CreateClient();
        var request = new AuthRequest() { Username = "invaliduser", Password = "wrongpassword" };
        var response = await client.PostAsJsonAsync("api/auth/login", request);
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Register_WhenCalledWithEmptyUsername_ReturnsBadRequest()
    {
        var client = _factory.CreateClient();
        var request = new AuthRequest() { Username = "", Password = "test123321" };
        var response = await client.PostAsJsonAsync("api/auth/register", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Register_WhenCalledWithEmptyPassword_ReturnsBadRequest()
    {
        var client = _factory.CreateClient();
        var request = new AuthRequest() { Username = "testuser", Password = "" };
        var response = await client.PostAsJsonAsync("api/auth/register", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Register_WhenCalledWithNullUsername_ReturnsBadRequest()
    {
        var client = _factory.CreateClient();
        var request = new AuthRequest() { Username = null, Password = "test123321" };
        var response = await client.PostAsJsonAsync("api/auth/register", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Register_WhenCalledWithNullPassword_ReturnsBadRequest()
    {
        var client = _factory.CreateClient();
        var request = new AuthRequest() { Username = "testuser", Password = null };
        var response = await client.PostAsJsonAsync("api/auth/register", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}