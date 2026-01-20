namespace Sales.Application.Dtos;

public sealed record SalesSummaryDto(int TotalOrders, decimal TotalRevenue, int PendingOrders, IReadOnlyList<OrderDto> RecentOrders);
