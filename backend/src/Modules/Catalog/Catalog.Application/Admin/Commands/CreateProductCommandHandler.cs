using Catalog.Application.Dtos;
using BuildingBlocks.Domain;
using Catalog.Domain;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, AdminProductDto>
{
    private readonly ICatalogDbContext _context;

    public CreateProductCommandHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public async Task<AdminProductDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var category = _context.Categories.FirstOrDefault(c => c.Id == request.CategoryId);
        if (category == null)
        {
            throw new InvalidOperationException("Category not found.");
        }

        if (_context.Products.Any(p => p.Slug.ToLower() == request.Slug.ToLower()))
        {
            throw new InvalidOperationException("Product slug already exists.");
        }

        var now = DateTime.UtcNow;
        var product = new Product(
            Guid.NewGuid(),
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
            now,
            now
        );

        await _context.AddProductAsync(product, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new AdminProductDto(
            product.Id.ToString(),
            product.Slug,
            product.Name,
            product.Description,
            product.Price.Amount,
            product.Price.Currency,
            product.Images,
            category.Id.ToString(),
            category.Name,
            product.Sizes,
            product.Colors,
            product.Rating,
            product.Inventory,
            product.IsNew,
            product.IsBestSeller,
            product.IsOnSale,
            product.IsActive,
            product.CreatedAt,
            product.UpdatedAt
        );
    }
}
