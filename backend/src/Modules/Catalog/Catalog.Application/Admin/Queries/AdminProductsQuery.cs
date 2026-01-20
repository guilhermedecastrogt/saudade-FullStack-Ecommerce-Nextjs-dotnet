using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Queries;

public sealed record AdminProductsQuery(string? Search, string? CategoryId, bool? IsActive, int Page, int PageSize) : IRequest<AdminProductsResult>;
