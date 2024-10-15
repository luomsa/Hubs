using System.Text.Json.Serialization;

namespace Hubs.Api.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TimeSortOrder
{
    Hour,
    Day,
    Week,
    Month,
    Year,
    AllTime
}