using Sales.Domain;

namespace Sales.Application.Dtos;

public sealed record OrderDto(
    string Id,
    string OrderNumber,
    AddressDto ShippingAddress,
    decimal Subtotal,
    decimal Shipping,
    decimal Total,
    string Currency,
    OrderStatus Status,
    DateTime CreatedAt,
    IReadOnlyList<OrderItemDto> Items
);
