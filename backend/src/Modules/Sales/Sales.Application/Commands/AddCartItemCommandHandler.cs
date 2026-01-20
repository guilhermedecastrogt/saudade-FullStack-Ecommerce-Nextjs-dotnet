using BuildingBlocks.Domain;
using MediatR;
using Sales.Application.Dtos;
using Sales.Domain;

namespace Sales.Application.Commands;

public sealed class AddCartItemCommandHandler : IRequestHandler<AddCartItemCommand, CartDto>
{
    private readonly ISalesDbContext _context;

    public AddCartItemCommandHandler(ISalesDbContext context)
    {
        _context = context;
    }

    public async Task<CartDto> Handle(AddCartItemCommand request, CancellationToken cancellationToken)
    {
        var cart = _context.Carts.FirstOrDefault(c => c.Id == request.CartId);
        if (cart == null)
        {
            throw new BuildingBlocks.Abstractions.NotFoundException("Cart not found.");
        }

        var existingItem = _context.CartItems.FirstOrDefault(i => i.CartId == request.CartId && i.ProductId == request.ProductId && i.Size == request.Size && i.Color == request.Color);
        if (existingItem != null)
        {
            var updated = new CartItem(
                existingItem.Id,
                existingItem.CartId,
                existingItem.ProductId,
                existingItem.ProductSlug,
                existingItem.ProductName,
                existingItem.UnitPrice,
                existingItem.Quantity + request.Quantity,
                existingItem.Size,
                existingItem.Color,
                existingItem.Image
            );

            _context.RemoveCartItem(existingItem);
            await _context.AddCartItemAsync(updated, cancellationToken);
        }
        else
        {
            var item = new CartItem(
                Guid.NewGuid(),
                request.CartId,
                request.ProductId,
                request.ProductSlug,
                request.ProductName,
                new Money(request.UnitPrice, request.Currency),
                request.Quantity,
                request.Size,
                request.Color,
                request.Image
            );

            await _context.AddCartItemAsync(item, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);

        var items = _context.CartItems.Where(i => i.CartId == request.CartId).ToList();
        return new CartDto(request.CartId.ToString(), items.Select(MapCartItem).ToList());
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
