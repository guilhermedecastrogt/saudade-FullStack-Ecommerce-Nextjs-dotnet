using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Queries;

public sealed record GetCategoriesQuery() : IRequest<IReadOnlyList<CategoryDto>>;
