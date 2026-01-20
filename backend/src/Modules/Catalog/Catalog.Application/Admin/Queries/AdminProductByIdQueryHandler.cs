using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Queries;

public sealed class AdminProductByIdQueryHandler : IRequestHandler<AdminProductByIdQuery, AdminProductDto?>
{
    private readonly ICatalogDbContext _context;

    public AdminProductByIdQueryHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public Task<AdminProductDto?> Handle(AdminProductByIdQuery request, CancellationToken cancellationToken)
    {
        var entry = _context.Products.Join(
                _context.Categories,
                product => product.CategoryId,
                category => category.Id,
                (product, category) => new { product, category }
            )
            .FirstOrDefault(p => p.product.Id == request.ProductId);

        if (entry == null)
        {
            return Task.FromResult<AdminProductDto?>(null);
        }

        var dto = new AdminProductDto(
            entry.product.Id.ToString(),
            entry.product.Slug,
            entry.product.Name,
            entry.product.Description,
            entry.product.Price.Amount,
            entry.product.Price.Currency,
            entry.product.Images,
            entry.category.Id.ToString(),
            entry.category.Name,
            entry.product.Sizes,
            entry.product.Colors,
            entry.product.Rating,
            entry.product.Inventory,
            entry.product.IsNew,
            entry.product.IsBestSeller,
            entry.product.IsOnSale,
            entry.product.IsActive,
            entry.product.CreatedAt,
            entry.product.UpdatedAt
        );

        return Task.FromResult<AdminProductDto?>(dto);
    }
}
