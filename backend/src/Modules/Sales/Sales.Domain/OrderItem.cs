using BuildingBlocks.Domain;

namespace Sales.Domain;

public sealed class OrderItem : Entity<Guid>
{
    public Guid OrderId { get; private set; }
    public string ProductId { get; private set; } = string.Empty;
    public string ProductSlug { get; private set; } = string.Empty;
    public string ProductName { get; private set; } = string.Empty;
    public Money UnitPrice { get; private set; } = new Money(0, "EUR");
    public int Quantity { get; private set; }
    public string Size { get; private set; } = string.Empty;
    public string Color { get; private set; } = string.Empty;
    public string Image { get; private set; } = string.Empty;

    private OrderItem()
    {
    }

    public OrderItem(Guid id, Guid orderId, string productId, string productSlug, string productName, Money unitPrice, int quantity, string size, string color, string image)
    {
        Id = id;
        OrderId = orderId;
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
