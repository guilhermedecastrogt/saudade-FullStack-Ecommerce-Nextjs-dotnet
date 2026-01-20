using MediatR;
using Sales.Application.Dtos;
using Sales.Domain;

namespace Sales.Application.Queries;

public sealed class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, OrderDto?>
{
    private readonly ISalesDbContext _context;

    public GetOrderByIdQueryHandler(ISalesDbContext context)
    {
        _context = context;
    }

    public Task<OrderDto?> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
    {
        var order = _context.Orders.FirstOrDefault(o => o.Id == request.OrderId);
        if (order == null)
        {
            return Task.FromResult<OrderDto?>(null);
        }

        var items = _context.OrderItems.Where(i => i.OrderId == order.Id).Select(MapItem).ToList();
        return Task.FromResult<OrderDto?>(MapOrder(order, items));
    }

    private static OrderItemDto MapItem(OrderItem item)
    {
        return new OrderItemDto(
            item.Id.ToString(),
            item.ProductId,
            item.ProductSlug,
            item.ProductName,
            item.UnitPrice.Amount,
            item.UnitPrice.Currency,
            item.Quantity,
            item.Size,
            item.Color,
            item.Image
        );
    }

    private static OrderDto MapOrder(Order order, IReadOnlyList<OrderItemDto> items)
    {
        var address = new AddressDto(
            order.ShippingAddress.FirstName,
            order.ShippingAddress.LastName,
            order.ShippingAddress.Email,
            order.ShippingAddress.Line1,
            order.ShippingAddress.City,
            order.ShippingAddress.PostalCode,
            order.ShippingAddress.Country
        );

        return new OrderDto(
            order.Id.ToString(),
            order.OrderNumber,
            address,
            order.Subtotal.Amount,
            order.Shipping.Amount,
            order.Total.Amount,
            order.Total.Currency,
            order.Status,
            order.CreatedAt,
            items
        );
    }
}
