namespace Catalog.Application.Dtos;

public sealed record AdminProductDto(
    string Id,
    string Slug,
    string Name,
    string Description,
    decimal Price,
    string Currency,
    string[] Images,
    string CategoryId,
    string CategoryName,
    string[] Sizes,
    string[] Colors,
    decimal Rating,
    int Inventory,
    bool IsNew,
    bool IsBestSeller,
    bool IsOnSale,
    bool IsActive,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
