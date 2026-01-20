using BuildingBlocks.Domain;

namespace Catalog.Domain;

public sealed class Product : AuditableEntity<Guid>
{
    public string Slug { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public Money Price { get; private set; } = new Money(0, "EUR");
    public string[] Images { get; private set; } = Array.Empty<string>();
    public string[] Sizes { get; private set; } = Array.Empty<string>();
    public string[] Colors { get; private set; } = Array.Empty<string>();
    public decimal Rating { get; private set; }
    public int Inventory { get; private set; }
    public bool IsNew { get; private set; }
    public bool IsBestSeller { get; private set; }
    public bool IsOnSale { get; private set; }
    public bool IsActive { get; private set; }
    public Guid CategoryId { get; private set; }
    public Category Category { get; private set; } = null!;

    private Product()
    {
    }

    public Product(Guid id, string slug, string name, string description, Money price, string[] images, string[] sizes, string[] colors, decimal rating, int inventory, bool isNew, bool isBestSeller, bool isOnSale, bool isActive, Guid categoryId, DateTime createdAt, DateTime updatedAt)
    {
        Id = id;
        Slug = slug;
        Name = name;
        Description = description;
        Price = price;
        Images = images;
        Sizes = sizes;
        Colors = colors;
        Rating = rating;
        Inventory = inventory;
        IsNew = isNew;
        IsBestSeller = isBestSeller;
        IsOnSale = isOnSale;
        IsActive = isActive;
        CategoryId = categoryId;
        CreatedAt = createdAt;
        UpdatedAt = updatedAt;
    }
}
