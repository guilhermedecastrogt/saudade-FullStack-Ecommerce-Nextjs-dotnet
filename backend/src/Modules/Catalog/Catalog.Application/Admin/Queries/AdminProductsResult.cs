using Catalog.Application.Dtos;

namespace Catalog.Application.Admin.Queries;

public sealed record AdminProductsResult(IReadOnlyList<AdminProductDto> Items, int Total, int Page, int PageSize);
