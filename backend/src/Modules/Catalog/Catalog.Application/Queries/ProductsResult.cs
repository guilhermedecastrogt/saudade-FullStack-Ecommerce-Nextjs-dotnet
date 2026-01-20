using Catalog.Application.Dtos;

namespace Catalog.Application.Queries;

public sealed record ProductsResult(IReadOnlyList<ProductDto> Items, int Total, int Page, int PageSize);
