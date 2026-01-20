using BuildingBlocks.Domain;

namespace Sales.Domain;

public sealed class CartItem : Entity<Guid>
{
    public Guid CartId { get; private set; }
    public string ProductId { get; private set; } = string.Empty;
    public string ProductSlug { get; private set; } = string.Empty;
    public string ProductName { get; private set; } = string.Empty;
    public Money UnitPrice { get; private set; } = new Money(0, "EUR");
    public int Quantity { get; private set; }
    public string Size { get; private set; } = string.Empty;
    public string Color { get; private set; } = string.Empty;
    public string Image { get; private set; } = string.Empty;

    private CartItem()
    {
    }

    public CartItem(Guid id, Guid cartId, string productId, string productSlug, string productName, Money unitPrice, int quantity, string size, string color, string image)
    {
        Id = id;
        CartId = cartId;
        ProductId = productId;
        ProductSlug = productSlug;
        ProductName = productName;
        UnitPrice = unitPrice;
        Quantity = quantity;
        Size = size;
        Color = color;
        Image = image;
    }
}
