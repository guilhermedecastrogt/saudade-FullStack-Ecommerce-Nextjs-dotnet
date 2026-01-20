using MediatR;
using Sales.Application.Dtos;
using Sales.Domain;

namespace Sales.Application.Admin.Commands;

public sealed record UpdateOrderStatusCommand(Guid OrderId, OrderStatus Status) : IRequest<OrderDto>;
