using Catalog.Application.Dtos;
using Catalog.Domain;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, AdminCategoryDto>
{
    private readonly ICatalogDbContext _context;

    public UpdateCategoryCommandHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public async Task<AdminCategoryDto> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var existing = _context.Categories.FirstOrDefault(c => c.Id == request.CategoryId);
        if (existing == null)
        {
            throw new InvalidOperationException("Category not found.");
        }

        var slugConflict = _context.Categories.Any(c => c.Id != request.CategoryId && c.Slug.ToLower() == request.Slug.ToLower());
        if (slugConflict)
        {
            throw new InvalidOperationException("Category slug already exists.");
        }

        var updated = new Category(existing.Id, request.Slug.Trim(), request.Name.Trim(), request.IsActive, existing.CreatedAt, DateTime.UtcNow);
        _context.RemoveCategory(existing);
        await _context.AddCategoryAsync(updated, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new AdminCategoryDto(updated.Id.ToString(), updated.Slug, updated.Name, updated.IsActive);
    }
}
