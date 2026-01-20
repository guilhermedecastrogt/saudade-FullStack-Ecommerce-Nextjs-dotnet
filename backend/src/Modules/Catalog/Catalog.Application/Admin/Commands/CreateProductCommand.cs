using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed record CreateProductCommand(
    string Slug,
    string Name,
    string Description,
    decimal Price,
    string Currency,
    string[] Images,
    string[] Sizes,
    string[] Colors,
    decimal Rating,
    int Inventory,
    bool IsNew,
    bool IsBestSeller,
    bool IsOnSale,
    bool IsActive,
    Guid CategoryId
) : IRequest<AdminProductDto>;
