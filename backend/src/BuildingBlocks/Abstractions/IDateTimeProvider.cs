namespace BuildingBlocks.Abstractions;

public interface IDateTimeProvider
{
    DateTime UtcNow { get; }
}
