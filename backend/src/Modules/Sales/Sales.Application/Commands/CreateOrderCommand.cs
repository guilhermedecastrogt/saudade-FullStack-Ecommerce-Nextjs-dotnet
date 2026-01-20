using MediatR;
using Sales.Application.Dtos;

namespace Sales.Application.Commands;

public sealed record CreateOrderCommand(
    AddressDto ShippingAddress,
    IReadOnlyList<CreateOrderItemDto> Items,
    string? IdempotencyKey
) : IRequest<OrderDto>;
