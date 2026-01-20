using MediatR;
using Sales.Application.Dtos;
using Sales.Domain;

namespace Sales.Application.Admin.Commands;

public sealed class UpdateOrderStatusCommandHandler : IRequestHandler<UpdateOrderStatusCommand, OrderDto>
{
    private readonly ISalesDbContext _context;

    public UpdateOrderStatusCommandHandler(ISalesDbContext context)
    {
        _context = context;
    }

    public async Task<OrderDto> Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
    {
        var order = _context.Orders.FirstOrDefault(o => o.Id == request.OrderId);
        if (order == null)
        {
            throw new InvalidOperationException("Order not found.");
        }

        _context.UpdateOrderStatus(order, request.Status, DateTime.UtcNow);
        await _context.SaveChangesAsync(cancellationToken);

        var orderItems = _context.OrderItems.Where(i => i.OrderId == order.Id).ToList();
        var items = orderItems.Select(MapItem).ToList();
        return MapOrder(order, items);
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
