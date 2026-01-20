using BuildingBlocks.Abstractions;

namespace BuildingBlocks.Infrastructure;

public sealed class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}
