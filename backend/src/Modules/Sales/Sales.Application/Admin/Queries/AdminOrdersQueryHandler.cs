using MediatR;
using Sales.Application.Dtos;
using Sales.Domain;

namespace Sales.Application.Admin.Queries;

public sealed class AdminOrdersQueryHandler : IRequestHandler<AdminOrdersQuery, AdminOrdersResult>
{
    private readonly ISalesDbContext _context;

    public AdminOrdersQueryHandler(ISalesDbContext context)
    {
        _context = context;
    }

    public Task<AdminOrdersResult> Handle(AdminOrdersQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Orders.AsQueryable();

        if (request.Status.HasValue)
        {
            query = query.Where(o => o.Status == request.Status.Value);
        }

        if (request.From.HasValue)
        {
            query = query.Where(o => o.CreatedAt >= request.From.Value);
        }

        if (request.To.HasValue)
        {
            query = query.Where(o => o.CreatedAt <= request.To.Value);
        }

        var total = query.Count();
        var page = request.Page <= 0 ? 1 : request.Page;
        var pageSize = request.PageSize <= 0 ? 20 : request.PageSize;

        var orders = query
            .OrderByDescending(o => o.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var orderIds = orders.Select(o => o.Id).ToList();
        var orderItems = _context.OrderItems.Where(i => orderIds.Contains(i.OrderId)).ToList();

        var dtos = orders.Select(order =>
        {
            var items = orderItems.Where(i => i.OrderId == order.Id).Select(MapItem).ToList();
            return MapOrder(order, items);
        }).ToList();

        return Task.FromResult(new AdminOrdersResult(dtos, total, page, pageSize));
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
