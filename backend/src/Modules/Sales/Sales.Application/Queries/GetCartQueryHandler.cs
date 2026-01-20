using MediatR;
using Sales.Application.Dtos;
using Sales.Domain;

namespace Sales.Application.Queries;

public sealed class GetCartQueryHandler : IRequestHandler<GetCartQuery, CartDto>
{
    private readonly ISalesDbContext _context;

    public GetCartQueryHandler(ISalesDbContext context)
    {
        _context = context;
    }

    public Task<CartDto> Handle(GetCartQuery request, CancellationToken cancellationToken)
    {
        var cart = _context.Carts.FirstOrDefault(c => c.Id == request.CartId);
        if (cart == null)
        {
            throw new BuildingBlocks.Abstractions.NotFoundException("Cart not found.");
        }

        var items = _context.CartItems.Where(i => i.CartId == request.CartId).ToList();
        return Task.FromResult(new CartDto(cart.Id.ToString(), items.Select(MapCartItem).ToList()));
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
