using MediatR;
using Sales.Application.Dtos;

namespace Sales.Application.Commands;

public sealed record RemoveCartItemCommand(Guid CartId, Guid ItemId) : IRequest<CartDto>;
