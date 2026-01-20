namespace Sales.Application.Commands;

public sealed record CreateOrderItemDto(
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
