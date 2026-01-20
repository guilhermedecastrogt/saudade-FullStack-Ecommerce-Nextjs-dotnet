using Sales.Application.Dtos;

namespace Sales.Application.Admin.Queries;

public sealed record AdminOrdersResult(IReadOnlyList<OrderDto> Items, int Total, int Page, int PageSize);
