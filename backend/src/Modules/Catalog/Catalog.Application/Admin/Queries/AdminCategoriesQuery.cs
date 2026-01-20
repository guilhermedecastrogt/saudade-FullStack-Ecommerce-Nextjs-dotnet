using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Queries;

public sealed record AdminCategoriesQuery(bool? IsActive) : IRequest<IReadOnlyList<AdminCategoryDto>>;
