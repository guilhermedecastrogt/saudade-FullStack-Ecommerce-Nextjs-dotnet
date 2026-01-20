using Catalog.Application.Dtos;
using Catalog.Domain;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, AdminCategoryDto>
{
    private readonly ICatalogDbContext _context;

    public CreateCategoryCommandHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public async Task<AdminCategoryDto> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        if (_context.Categories.Any(c => c.Slug.ToLower() == request.Slug.ToLower()))
        {
            throw new InvalidOperationException("Category slug already exists.");
        }

        var now = DateTime.UtcNow;
        var category = new Category(Guid.NewGuid(), request.Slug.Trim(), request.Name.Trim(), request.IsActive, now, now);
        await _context.AddCategoryAsync(category, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new AdminCategoryDto(category.Id.ToString(), category.Slug, category.Name, category.IsActive);
    }
}
