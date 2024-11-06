using System.Text.Json.Serialization;
using Hubs.Api.Data;
using Hubs.Api.Exceptions;
using Hubs.Api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddControllers(options =>
{
    options.ModelMetadataDetailsProviders.Add(new SystemTextJsonValidationMetadataProvider());
}).AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });
;
services.AddRouting(options => { options.LowercaseUrls = true; });
var connectionString = builder.Configuration["HUB_CONNECTION_STRING"];
services.AddDbContext<HubDbContext>(options => { options.UseNpgsql(connectionString); });
services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 8;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredUniqueChars = 0;
}).AddEntityFrameworkStores<HubDbContext>();

services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Path = "/";
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        var problemFactory = context.HttpContext.RequestServices.GetRequiredService<ProblemDetailsFactory>();
        if (context.Request.Path == "/api/users/me")
        {
            var meProblem =
                problemFactory.CreateProblemDetails(context.HttpContext, StatusCodes.Status401Unauthorized);
            return context.Response.WriteAsJsonAsync(meProblem);
        }

        var problem =
            problemFactory.CreateProblemDetails(context.HttpContext, StatusCodes.Status401Unauthorized,
                "Session expired");
        return context.Response.WriteAsJsonAsync(problem);
    };
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        var problemFactory = context.HttpContext.RequestServices.GetRequiredService<ProblemDetailsFactory>();
        var problem =
            problemFactory.CreateProblemDetails(context.HttpContext, StatusCodes.Status403Forbidden, "Forbidden");
        return context.Response.WriteAsJsonAsync(problem);
    };
});

services.AddSwaggerGen(options => { options.SupportNonNullableReferenceTypes(); });
services.AddScoped<IHubService, HubService>();
services.AddScoped<IPostService, PostService>();
services.AddScoped<IHubService, HubService>();
services.AddScoped<ICommentService, CommentService>();
services.AddExceptionHandler<GlobalExceptionHandler>();
// services.AddHttpContextAccessor();
var app = builder.Build();
app.UseExceptionHandler("/error");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

public partial class Program {}