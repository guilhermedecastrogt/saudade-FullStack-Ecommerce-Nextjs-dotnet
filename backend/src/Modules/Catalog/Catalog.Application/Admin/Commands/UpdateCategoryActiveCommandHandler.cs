using Catalog.Application.Dtos;
using Catalog.Domain;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed class UpdateCategoryActiveCommandHandler : IRequestHandler<UpdateCategoryActiveCommand, AdminCategoryDto>
{
    private readonly ICatalogDbContext _context;

    public UpdateCategoryActiveCommandHandler(ICatalogDbContext context)
    {
        _context = context;
    }

    public async Task<AdminCategoryDto> Handle(UpdateCategoryActiveCommand request, CancellationToken cancellationToken)
    {
        var existing = _context.Categories.FirstOrDefault(c => c.Id == request.CategoryId);
        if (existing == null)
        {
            throw new InvalidOperationException("Category not found.");
        }

        var updated = new Category(existing.Id, existing.Slug, existing.Name, request.IsActive, existing.CreatedAt, DateTime.UtcNow);
        _context.RemoveCategory(existing);
        await _context.AddCategoryAsync(updated, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new AdminCategoryDto(updated.Id.ToString(), updated.Slug, updated.Name, updated.IsActive);
    }
}
