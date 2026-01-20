using BuildingBlocks.Domain;

namespace Sales.Domain;

public sealed class Order : AuditableEntity<Guid>
{
    public string OrderNumber { get; private set; } = string.Empty;
    public Guid? UserId { get; private set; }
    public Address ShippingAddress { get; private set; } = null!;
    public Money Subtotal { get; private set; } = new Money(0, "EUR");
    public Money Shipping { get; private set; } = new Money(0, "EUR");
    public Money Total { get; private set; } = new Money(0, "EUR");
    public OrderStatus Status { get; private set; }
    public string? IdempotencyKey { get; private set; }
    public List<OrderItem> Items { get; private set; } = new();

    private Order()
    {
    }

    public Order(Guid id, string orderNumber, Guid? userId, Address shippingAddress, Money subtotal, Money shipping, Money total, OrderStatus status, string? idempotencyKey, DateTime createdAt, DateTime updatedAt)
    {
        Id = id;
        OrderNumber = orderNumber;
        UserId = userId;
        ShippingAddress = shippingAddress;
        Subtotal = subtotal;
        Shipping = shipping;
        Total = total;
        Status = status;
        IdempotencyKey = idempotencyKey;
        CreatedAt = createdAt;
        UpdatedAt = updatedAt;
    }
}
