using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed record UpdateCategoryActiveCommand(Guid CategoryId, bool IsActive) : IRequest<AdminCategoryDto>;
