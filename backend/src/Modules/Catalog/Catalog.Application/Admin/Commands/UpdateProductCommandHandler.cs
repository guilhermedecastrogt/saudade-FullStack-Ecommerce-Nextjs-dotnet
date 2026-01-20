using BuildingBlocks.Domain;
using Catalog.Application.Dtos;
using Catalog.Domain;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, AdminProductDto>
{
    private readonly ICatalogDbContext _context;

    public UpdateProductCommandHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public async Task<AdminProductDto> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var existing = _context.Products.FirstOrDefault(p => p.Id == request.ProductId);
        if (existing == null)
        {
            throw new InvalidOperationException("Product not found.");
        }

        var category = _context.Categories.FirstOrDefault(c => c.Id == request.CategoryId);
        if (category == null)
        {
            throw new InvalidOperationException("Category not found.");
        }

        var slugConflict = _context.Products.Any(p => p.Id != request.ProductId && p.Slug.ToLower() == request.Slug.ToLower());
        if (slugConflict)
        {
            throw new InvalidOperationException("Product slug already exists.");
        }

        var updated = new Product(
            existing.Id,
            request.Slug.Trim(),
            request.Name.Trim(),
            request.Description.Trim(),
            new Money(request.Price, request.Currency),
            request.Images ?? Array.Empty<string>(),
            request.Sizes ?? Array.Empty<string>(),
            request.Colors ?? Array.Empty<string>(),
            request.Rating,
            request.Inventory,
            request.IsNew,
            request.IsBestSeller,
            request.IsOnSale,
            request.IsActive,
            request.CategoryId,
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
