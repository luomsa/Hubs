using System.ComponentModel.DataAnnotations;
using Hubs.Api.Data;

namespace Hubs.Api.Models;

public record NewPostDto()
{
    public required int PostId { get; set; }
    public required string Slug { get; set; }
    public required PostType Type { get; set; }
};