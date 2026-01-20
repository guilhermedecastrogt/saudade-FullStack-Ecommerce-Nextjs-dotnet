using Catalog.Application.Dtos;
using MediatR;
using Mapster;

namespace Catalog.Application.Admin.Queries;

public sealed class AdminCategoriesQueryHandler : IRequestHandler<AdminCategoriesQuery, IReadOnlyList<AdminCategoryDto>>
{
    private readonly ICatalogDbContext _context;

    public AdminCategoriesQueryHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public Task<IReadOnlyList<AdminCategoryDto>> Handle(AdminCategoriesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Categories.AsQueryable();
        if (request.IsActive.HasValue)
        {
            query = query.Where(c => c.IsActive == request.IsActive.Value);
        }

        var items = query
            .OrderBy(c => c.Name)
            .ToList()
            .Select(c => c.Adapt<AdminCategoryDto>())
            .ToList();

        return Task.FromResult<IReadOnlyList<AdminCategoryDto>>(items);
    }
}
