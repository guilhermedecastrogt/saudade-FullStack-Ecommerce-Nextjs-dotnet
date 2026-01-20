using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Queries;

public sealed class GetProductBySlugQueryHandler : IRequestHandler<GetProductBySlugQuery, ProductDto?>
{
    private readonly ICatalogDbContext _context;

    public GetProductBySlugQueryHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public Task<ProductDto?> Handle(GetProductBySlugQuery request, CancellationToken cancellationToken)
    {
        var entry = _context.Products.Join(
                _context.Categories,
                product => product.CategoryId,
                category => category.Id,
                (product, category) => new { product, category }
            )
            .FirstOrDefault(p => p.product.Slug == request.Slug);

        if (entry == null)
        {
            return Task.FromResult<ProductDto?>(null);
        }

        var dto = new ProductDto(
            entry.product.Id.ToString(),
            entry.product.Slug,
            entry.product.Name,
            entry.product.Description,
            entry.product.Price.Amount,
            entry.product.Price.Currency,
            entry.product.Images,
            entry.category.Name,
            entry.product.Sizes,
            entry.product.Colors,
            entry.product.Rating,
            entry.product.Inventory,
            entry.product.IsNew,
            entry.product.IsBestSeller,
            entry.product.IsOnSale
        );

        return Task.FromResult<ProductDto?>(dto);
    }
}
