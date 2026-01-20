using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Queries;

public sealed class CatalogSummaryQueryHandler : IRequestHandler<CatalogSummaryQuery, CatalogSummaryDto>
{
    private readonly ICatalogDbContext _context;

    public CatalogSummaryQueryHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public Task<CatalogSummaryDto> Handle(CatalogSummaryQuery request, CancellationToken cancellationToken)
    {
        var activeProducts = _context.Products.Count(p => p.IsActive);
        var lowStockProducts = _context.Products.Count(p => p.Inventory <= request.LowStockThreshold);
        return Task.FromResult(new CatalogSummaryDto(activeProducts, lowStockProducts));
    }
}
