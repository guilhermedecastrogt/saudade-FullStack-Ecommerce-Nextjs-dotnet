using BuildingBlocks.Domain;

namespace Sales.Domain;

public sealed class Cart : AuditableEntity<Guid>
{
    public Guid? UserId { get; private set; }
    public bool IsActive { get; private set; }
    public List<CartItem> Items { get; private set; } = new();

    private Cart()
    {
    }

    public Cart(Guid id, Guid? userId, bool isActive, DateTime createdAt, DateTime updatedAt)
    {
        Id = id;
        UserId = userId;
        IsActive = isActive;
        CreatedAt = createdAt;
        UpdatedAt = updatedAt;
    }
}
