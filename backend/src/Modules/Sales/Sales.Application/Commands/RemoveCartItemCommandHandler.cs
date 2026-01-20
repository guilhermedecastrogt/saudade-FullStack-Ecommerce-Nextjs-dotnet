using MediatR;
using Sales.Application.Dtos;
using Sales.Domain;

namespace Sales.Application.Commands;

public sealed class RemoveCartItemCommandHandler : IRequestHandler<RemoveCartItemCommand, CartDto>
{
    private readonly ISalesDbContext _context;

    public RemoveCartItemCommandHandler(ISalesDbContext context)
    {
        _context = context;
    }

    public async Task<CartDto> Handle(RemoveCartItemCommand request, CancellationToken cancellationToken)
    {
        var item = _context.CartItems.FirstOrDefault(i => i.Id == request.ItemId && i.CartId == request.CartId);
        if (item == null)
        {
            throw new BuildingBlocks.Abstractions.NotFoundException("Cart item not found.");
        }

        _context.RemoveCartItem(item);
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
