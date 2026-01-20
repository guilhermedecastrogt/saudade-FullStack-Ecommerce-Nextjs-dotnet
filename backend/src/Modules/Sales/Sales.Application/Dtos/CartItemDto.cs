namespace Sales.Application.Dtos;

public sealed record CartItemDto(
    string Id,
    string ProductId,
    string ProductSlug,
    string ProductName,
    decimal UnitPrice,
    string Currency,
    int Quantity,
    string Size,
    string Color,
    string Image
);
