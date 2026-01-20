using MediatR;
using Sales.Application.Dtos;

namespace Sales.Application.Queries;

public sealed record GetOrdersQuery() : IRequest<IReadOnlyList<OrderDto>>;
