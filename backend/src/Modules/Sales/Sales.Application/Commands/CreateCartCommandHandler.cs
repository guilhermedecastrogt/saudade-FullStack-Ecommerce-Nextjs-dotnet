using BuildingBlocks.Abstractions;
using MediatR;
using Sales.Application.Dtos;
using Sales.Domain;

namespace Sales.Application.Commands;

public sealed class CreateCartCommandHandler : IRequestHandler<CreateCartCommand, CartDto>
{
    private readonly ISalesDbContext _context;
    private readonly ICurrentUser _currentUser;
    private readonly IDateTimeProvider _dateTimeProvider;

    public CreateCartCommandHandler(ISalesDbContext context, ICurrentUser currentUser, IDateTimeProvider dateTimeProvider)
    {
        _context = context;
        _currentUser = currentUser;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<CartDto> Handle(CreateCartCommand request, CancellationToken cancellationToken)
    {
        if (request.CartId.HasValue)
        {
            var existing = _context.Carts.FirstOrDefault(c => c.Id == request.CartId.Value);
            if (existing != null)
            {
                var existingItems = _context.CartItems.Where(i => i.CartId == existing.Id).ToList();
                return new CartDto(existing.Id.ToString(), existingItems.Select(MapCartItem).ToList());
            }
        }

        var now = _dateTimeProvider.UtcNow;
        var cart = new Cart(Guid.NewGuid(), _currentUser.UserId, true, now, now);
        await _context.AddCartAsync(cart, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new CartDto(cart.Id.ToString(), Array.Empty<CartItemDto>());
    }

    private static CartItemDto MapCartItem(CartItem item)
    {
        return new CartItemDto(
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
}
