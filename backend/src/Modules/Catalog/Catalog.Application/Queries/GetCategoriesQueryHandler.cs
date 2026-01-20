using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Queries;

public sealed class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, IReadOnlyList<CategoryDto>>
{
    private readonly ICatalogDbContext _context;

    public GetCategoriesQueryHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public Task<IReadOnlyList<CategoryDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        var items = _context.Categories
            .Where(c => c.IsActive)
            .OrderBy(c => c.Name)
            .Select(c => new CategoryDto(c.Id.ToString(), c.Slug, c.Name))
            .ToList();

        return Task.FromResult<IReadOnlyList<CategoryDto>>(items);
    }
}
