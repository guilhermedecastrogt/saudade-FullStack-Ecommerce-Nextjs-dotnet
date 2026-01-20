namespace BuildingBlocks.Domain;

public abstract class AuditableEntity<TId> : Entity<TId>
{
    public DateTime CreatedAt { get; protected set; }
    public DateTime UpdatedAt { get; protected set; }
}
