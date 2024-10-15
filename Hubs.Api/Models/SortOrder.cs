using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Hubs.Api.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum SortOrder
{
    New,
    Top
}