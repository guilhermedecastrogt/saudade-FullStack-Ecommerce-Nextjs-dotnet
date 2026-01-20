using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed record UpdateCategoryCommand(Guid CategoryId, string Slug, string Name, bool IsActive) : IRequest<AdminCategoryDto>;
