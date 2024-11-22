using Hubs.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddServices(builder.Configuration);

var app = builder.Build();
app.UseExceptionHandler("/error");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

public partial class Program
{
}