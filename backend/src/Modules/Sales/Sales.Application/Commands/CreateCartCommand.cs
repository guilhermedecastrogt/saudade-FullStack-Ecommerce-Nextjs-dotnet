using MediatR;
using Sales.Application.Dtos;

namespace Sales.Application.Commands;

public sealed record CreateCartCommand(Guid? CartId) : IRequest<CartDto>;
