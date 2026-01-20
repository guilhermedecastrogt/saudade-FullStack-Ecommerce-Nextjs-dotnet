using BuildingBlocks.Domain;

namespace Catalog.Domain;

public sealed class Category : AuditableEntity<Guid>
{
    public string Slug { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public bool IsActive { get; private set; }

    private Category()
    {
    }

    public Category(Guid id, string slug, string name, bool isActive, DateTime createdAt, DateTime updatedAt)
    {
        Id = id;
        Slug = slug;
        Name = name;
        IsActive = isActive;
        CreatedAt = createdAt;
        UpdatedAt = updatedAt;
    }
}
