using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Queries;

public sealed class AdminProductsQueryHandler : IRequestHandler<AdminProductsQuery, AdminProductsResult>
{
    private readonly ICatalogDbContext _context;

    public AdminProductsQueryHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public Task<AdminProductsResult> Handle(AdminProductsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Products.Join(
            _context.Categories,
            product => product.CategoryId,
            category => category.Id,
            (product, category) => new { product, category }
        );

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim().ToLowerInvariant();
            query = query.Where(p => p.product.Name.ToLower().Contains(search) || p.product.Description.ToLower().Contains(search));
        }

        if (!string.IsNullOrWhiteSpace(request.CategoryId) && Guid.TryParse(request.CategoryId, out var categoryId))
        {
            query = query.Where(p => p.product.CategoryId == categoryId);
        }

        if (request.IsActive.HasValue)
        {
            query = query.Where(p => p.product.IsActive == request.IsActive.Value);
        }

        var total = query.Count();
        var page = request.Page <= 0 ? 1 : request.Page;
        var pageSize = request.PageSize <= 0 ? 20 : request.PageSize;

        var items = query
            .OrderByDescending(p => p.product.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new AdminProductDto(
                p.product.Id.ToString(),
                p.product.Slug,
                p.product.Name,
                p.product.Description,
                p.product.Price.Amount,
                p.product.Price.Currency,
                p.product.Images,
                p.category.Id.ToString(),
                p.category.Name,
                p.product.Sizes,
                p.product.Colors,
                p.product.Rating,
                p.product.Inventory,
                p.product.IsNew,
                p.product.IsBestSeller,
                p.product.IsOnSale,
                p.product.IsActive,
                p.product.CreatedAt,
                p.product.UpdatedAt
            ))
            .ToList();

        return Task.FromResult(new AdminProductsResult(items, total, page, pageSize));
    }
}
