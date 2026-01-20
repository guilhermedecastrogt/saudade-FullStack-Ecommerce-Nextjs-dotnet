using MediatR;
using Sales.Application.Dtos;
using Sales.Domain;

namespace Sales.Application.Admin.Queries;

public sealed class SalesSummaryQueryHandler : IRequestHandler<SalesSummaryQuery, SalesSummaryDto>
{
    private readonly ISalesDbContext _context;

    public SalesSummaryQueryHandler(ISalesDbContext context)
    {
        _context = context;
    }

    public Task<SalesSummaryDto> Handle(SalesSummaryQuery request, CancellationToken cancellationToken)
    {
        var orders = _context.Orders.ToList();
        var orderItems = _context.OrderItems.ToList();

        var totalOrders = orders.Count;
        var totalRevenue = orders.Sum(o => o.Total.Amount);
        var pendingOrders = orders.Count(o => o.Status == OrderStatus.Pending);

        var recentOrders = orders
            .OrderByDescending(o => o.CreatedAt)
            .Take(10)
            .Select(order =>
            {
                var items = orderItems.Where(i => i.OrderId == order.Id).Select(MapItem).ToList();
                return MapOrder(order, items);
            })
            .ToList();

        return Task.FromResult(new SalesSummaryDto(totalOrders, totalRevenue, pendingOrders, recentOrders));
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
