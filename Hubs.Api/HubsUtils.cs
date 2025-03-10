using Hubs.Api.Models;

namespace Hubs.Api;

public static class HubsUtils
{
    public static DateTime SortByTime(TimeSortOrder time) => time switch
    {
        TimeSortOrder.Hour => DateTime.UtcNow.AddHours(-1),
        TimeSortOrder.Day => DateTime.UtcNow.AddDays(-1),
        TimeSortOrder.Week => DateTime.UtcNow.AddDays(-7),
        TimeSortOrder.Month => DateTime.UtcNow.AddMonths(-1),
        TimeSortOrder.Year => DateTime.UtcNow.AddYears(-1),
        TimeSortOrder.AllTime => DateTime.MinValue,
        _ => throw new ArgumentOutOfRangeException(nameof(time), time, null)
    };
}