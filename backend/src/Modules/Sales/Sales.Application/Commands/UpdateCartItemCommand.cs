using MediatR;
using Sales.Application.Dtos;

namespace Sales.Application.Commands;

public sealed record UpdateCartItemCommand(Guid CartId, Guid ItemId, int Quantity) : IRequest<CartDto>;
