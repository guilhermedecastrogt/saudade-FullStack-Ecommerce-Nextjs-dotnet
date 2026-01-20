using BuildingBlocks.Abstractions;
using BuildingBlocks.Domain;
using MediatR;
using Sales.Application.Dtos;
using Sales.Domain;

namespace Sales.Application.Commands;

public sealed class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, OrderDto>
{
    private readonly ISalesDbContext _context;
    private readonly ICurrentUser _currentUser;
    private readonly IDateTimeProvider _dateTimeProvider;

    public CreateOrderCommandHandler(ISalesDbContext context, ICurrentUser currentUser, IDateTimeProvider dateTimeProvider)
    {
        _context = context;
        _currentUser = currentUser;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<OrderDto> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrWhiteSpace(request.IdempotencyKey))
        {
            var existing = _context.Orders.FirstOrDefault(o => o.IdempotencyKey == request.IdempotencyKey);
            if (existing != null)
            {
                return MapOrder(existing, _context.OrderItems.Where(i => i.OrderId == existing.Id).ToList());
            }
        }

        var subtotalValue = request.Items.Sum(i => i.UnitPrice * i.Quantity);
        var shippingValue = subtotalValue > 150 ? 0 : 15;
        var totalValue = subtotalValue + shippingValue;

        var now = _dateTimeProvider.UtcNow;
        var currency = request.Items.FirstOrDefault()?.Currency ?? "EUR";
        var order = new Order(
            Guid.NewGuid(),
            $"ORD-{now:yyyyMMdd}-{Guid.NewGuid().ToString("N")[..6].ToUpperInvariant()}",
            _currentUser.UserId,
            new Address(
                request.ShippingAddress.FirstName,
                request.ShippingAddress.LastName,
                request.ShippingAddress.Email,
                request.ShippingAddress.Line1,
                request.ShippingAddress.City,
                request.ShippingAddress.PostalCode,
                request.ShippingAddress.Country
            ),
            new Money(subtotalValue, currency),
            new Money(shippingValue, currency),
            new Money(totalValue, currency),
            OrderStatus.Paid,
            request.IdempotencyKey,
            now,
            now
        );

        await _context.AddOrderAsync(order, cancellationToken);

        foreach (var item in request.Items)
        {
            var orderItem = new OrderItem(
                Guid.NewGuid(),
                order.Id,
                item.ProductId,
                item.ProductSlug,
                item.ProductName,
                new Money(item.UnitPrice, item.Currency),
                item.Quantity,
                item.Size,
                item.Color,
                item.Image
            );
            await _context.AddOrderItemAsync(orderItem, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);

        var createdItems = _context.OrderItems.Where(i => i.OrderId == order.Id).ToList();
        return MapOrder(order, createdItems);
    }

    private static OrderDto MapOrder(Order order, IReadOnlyList<OrderItem> items)
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

        var itemDtos = items.Select(i => new OrderItemDto(
            i.Id.ToString(),
            i.ProductId,
            i.ProductSlug,
            i.ProductName,
            i.UnitPrice.Amount,
            i.UnitPrice.Currency,
            i.Quantity,
            i.Size,
            i.Color,
            i.Image
        )).ToList();

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
            itemDtos
        );
    }
}
