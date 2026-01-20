namespace Catalog.Application.Dtos;

public sealed record ProductDto(
    string Id,
    string Slug,
    string Name,
    string Description,
    decimal Price,
    string Currency,
    string[] Images,
    string Category,
    string[] Sizes,
    string[] Colors,
    decimal Rating,
    int Inventory,
    bool? IsNew,
    bool? IsBestSeller,
    bool? IsOnSale
);
