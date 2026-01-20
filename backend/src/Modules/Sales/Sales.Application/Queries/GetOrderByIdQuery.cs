using MediatR;
using Sales.Application.Dtos;

namespace Sales.Application.Queries;

public sealed record GetOrderByIdQuery(Guid OrderId) : IRequest<OrderDto?>;
