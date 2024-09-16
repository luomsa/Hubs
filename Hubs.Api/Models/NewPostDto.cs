using System.ComponentModel.DataAnnotations;
using Hubs.Api.Data;

namespace Hubs.Api.Models;

public record NewPostDto()
{
  [Required] public int PostId { get; set; }
  [Required] public string Slug { get; set; } = null!;
  [Required] public PostType Type { get; set; }
};