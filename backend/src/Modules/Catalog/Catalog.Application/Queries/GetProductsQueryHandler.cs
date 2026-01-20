using Catalog.Application.Dtos;
using Catalog.Domain;
using MediatR;

namespace Catalog.Application.Queries;

public sealed class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, ProductsResult>
{
    private readonly ICatalogDbContext _context;

    public GetProductsQueryHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public Task<ProductsResult> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Products.Join(
            _context.Categories,
            product => product.CategoryId,
            category => category.Id,
            (product, category) => new { product, category }
        );

        if (!string.IsNullOrWhiteSpace(request.Category))
        {
            var categoryLower = request.Category.Trim().ToLowerInvariant();
            query = query.Where(p => p.category.Name.ToLower() == categoryLower || p.category.Slug.ToLower() == categoryLower);
        }

        if (!string.IsNullOrWhiteSpace(request.Query))
        {
            var q = request.Query.Trim().ToLowerInvariant();
            query = query.Where(p => p.product.Name.ToLower().Contains(q) || p.product.Description.ToLower().Contains(q));
        }

        if (request.MinPrice.HasValue)
        {
            query = query.Where(p => p.product.Price.Amount >= request.MinPrice.Value);
        }

        if (request.MaxPrice.HasValue)
        {
            query = query.Where(p => p.product.Price.Amount <= request.MaxPrice.Value);
        }

        query = request.Sort switch
        {
            "price_asc" => query.OrderBy(p => p.product.Price.Amount),
            "price_desc" => query.OrderByDescending(p => p.product.Price.Amount),
            "newest" => query.OrderByDescending(p => p.product.CreatedAt),
            _ => query.OrderBy(p => p.product.Name)
        };

        var total = query.Count();
        var page = request.Page <= 0 ? 1 : request.Page;
        var pageSize = request.PageSize <= 0 ? 20 : request.PageSize;

        var items = query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new ProductDto(
                p.product.Id.ToString(),
                p.product.Slug,
                p.product.Name,
                p.product.Description,
                p.product.Price.Amount,
                p.product.Price.Currency,
                p.product.Images,
                p.category.Name,
                p.product.Sizes,
                p.product.Colors,
                p.product.Rating,
                p.product.Inventory,
                p.product.IsNew,
                p.product.IsBestSeller,
                p.product.IsOnSale
            ))
            .ToList();

        return Task.FromResult(new ProductsResult(items, total, page, pageSize));
    }
}
