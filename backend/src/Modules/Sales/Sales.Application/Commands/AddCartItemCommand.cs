using MediatR;
using Sales.Application.Dtos;

namespace Sales.Application.Commands;

public sealed record AddCartItemCommand(
    Guid CartId,
    string ProductId,
    string ProductSlug,
    string ProductName,
    decimal UnitPrice,
    string Currency,
    int Quantity,
    string Size,
    string Color,
    string Image
) : IRequest<CartDto>;
