namespace Sales.Application.Dtos;

public sealed record OrderItemDto(
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
