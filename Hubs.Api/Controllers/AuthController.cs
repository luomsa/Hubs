using Hubs.Api.Data;
using Hubs.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Hubs.Api.Controllers;
[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly SignInManager<User> _signInManager;

    public AuthController(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    [Route("register")]
    [HttpPost]
    public async Task<IResult> Register(AuthRequest request)
    {
        var user = await _signInManager.UserManager.FindByNameAsync(request.Username);
        if (user is not null)
        {
            var userExistsProblem =
                ProblemDetailsFactory.CreateProblemDetails(HttpContext,StatusCodes.Status409Conflict,
                    "Username is already taken");
            return TypedResults.Conflict(userExistsProblem);
        }

        var result = await _signInManager.UserManager.CreateAsync(new User() { UserName = request.Username }, request.Password);
        if (result.Succeeded)
        {
            return TypedResults.Ok();
        }

        return TypedResults.BadRequest();
    }
    [Route("login")]
    [HttpPost]
    public async Task<IResult> Login(AuthRequest request)
    {
        var user = await _signInManager.UserManager.FindByNameAsync(request.Username);
        if (user is null)
        {
            var wrongUserProblem =
                ProblemDetailsFactory.CreateProblemDetails(HttpContext,StatusCodes.Status409Conflict,
                    "Wrong username or password");
            return TypedResults.Json(wrongUserProblem, statusCode: StatusCodes.Status401Unauthorized);
        }

        var result = await _signInManager.PasswordSignInAsync(user, request.Password, false, false);
        if (result.Succeeded)
        {
            return TypedResults.Ok();
        }

        return TypedResults.BadRequest();
    }

    [Route("logout")]
    [HttpPost]
    public async Task<IResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return TypedResults.Ok();
    }
}