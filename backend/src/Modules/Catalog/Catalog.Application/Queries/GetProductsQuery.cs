using MediatR;

namespace Catalog.Application.Queries;

public sealed record GetProductsQuery(string? Category, string? Query, string? Sort, decimal? MinPrice, decimal? MaxPrice, int Page, int PageSize) : IRequest<ProductsResult>;
