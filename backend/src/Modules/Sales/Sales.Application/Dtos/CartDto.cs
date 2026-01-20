namespace Sales.Application.Dtos;

public sealed record CartDto(string Id, IReadOnlyList<CartItemDto> Items);
