using System.Text.Json;
using System.Text.Json.Serialization;
using Hubs.Api;
using Hubs.Api.Data;
using Hubs.Api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers(options =>
{
    options.ModelMetadataDetailsProviders.Add(new SystemTextJsonValidationMetadataProvider());
}).AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });
;
builder.Services.AddRouting(options => { options.LowercaseUrls = true; });
var connectionString = builder.Configuration["HUB_CONNECTION_STRING"];
builder.Services.AddDbContext<HubDbContext>(options => { options.UseNpgsql(connectionString); });
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 8;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredUniqueChars = 0;
}).AddEntityFrameworkStores<HubDbContext>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Path = "/";
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        var problemFactory = context.HttpContext.RequestServices.GetRequiredService<ProblemDetailsFactory>();
        var problem =
            problemFactory.CreateProblemDetails(context.HttpContext, StatusCodes.Status401Unauthorized, "Unauthorized");
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

builder.Services.AddSwaggerGen(options => { options.SupportNonNullableReferenceTypes(); });
builder.Services.AddScoped<IHubService, HubService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<IHubService, HubService>();
builder.Services.AddScoped<ICommentService, CommentService>();
// builder.Services.AddHttpContextAccessor();
var app = builder.Build();
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