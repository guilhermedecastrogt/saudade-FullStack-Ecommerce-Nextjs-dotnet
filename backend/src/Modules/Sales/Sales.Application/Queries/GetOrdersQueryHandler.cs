using BuildingBlocks.Abstractions;
using MediatR;
using Sales.Application.Dtos;
using Sales.Domain;

namespace Sales.Application.Queries;

public sealed class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, IReadOnlyList<OrderDto>>
{
    private readonly ISalesDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GetOrdersQueryHandler(ISalesDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public Task<IReadOnlyList<OrderDto>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
    {
        if (!_currentUser.UserId.HasValue)
        {
            return Task.FromResult<IReadOnlyList<OrderDto>>(Array.Empty<OrderDto>());
        }

        var orders = _context.Orders.Where(o => o.UserId == _currentUser.UserId).OrderByDescending(o => o.CreatedAt).ToList();
        var orderItems = _context.OrderItems.ToList();

        var dtos = orders.Select(order =>
        {
            var items = orderItems.Where(i => i.OrderId == order.Id).Select(MapItem).ToList();
            return MapOrder(order, items);
        }).ToList();

        return Task.FromResult<IReadOnlyList<OrderDto>>(dtos);
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
