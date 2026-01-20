using BuildingBlocks.Domain;
using Catalog.Application.Dtos;
using Catalog.Domain;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed class UpdateProductActiveCommandHandler : IRequestHandler<UpdateProductActiveCommand, AdminProductDto>
{
    private readonly ICatalogDbContext _context;

    public UpdateProductActiveCommandHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public async Task<AdminProductDto> Handle(UpdateProductActiveCommand request, CancellationToken cancellationToken)
    {
        var existing = _context.Products.FirstOrDefault(p => p.Id == request.ProductId);
        if (existing == null)
        {
            throw new InvalidOperationException("Product not found.");
        }

        var category = _context.Categories.FirstOrDefault(c => c.Id == existing.CategoryId);
        if (category == null)
        {
            throw new InvalidOperationException("Category not found.");
        }

        var updated = new Product(
            existing.Id,
            existing.Slug,
            existing.Name,
            existing.Description,
            new Money(existing.Price.Amount, existing.Price.Currency),
            existing.Images,
            existing.Sizes,
            existing.Colors,
            existing.Rating,
            existing.Inventory,
            existing.IsNew,
            existing.IsBestSeller,
            existing.IsOnSale,
            request.IsActive,
            existing.CategoryId,
            existing.CreatedAt,
            DateTime.UtcNow
        );

        _context.RemoveProduct(existing);
        await _context.AddProductAsync(updated, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new AdminProductDto(
            updated.Id.ToString(),
            updated.Slug,
            updated.Name,
            updated.Description,
            updated.Price.Amount,
            updated.Price.Currency,
            updated.Images,
            category.Id.ToString(),
            category.Name,
            updated.Sizes,
            updated.Colors,
            updated.Rating,
            updated.Inventory,
            updated.IsNew,
            updated.IsBestSeller,
            updated.IsOnSale,
            updated.IsActive,
            updated.CreatedAt,
            updated.UpdatedAt
        );
    }
}
