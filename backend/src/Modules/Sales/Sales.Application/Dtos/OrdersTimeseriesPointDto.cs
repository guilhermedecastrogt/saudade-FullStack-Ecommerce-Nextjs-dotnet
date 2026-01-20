namespace Sales.Application.Dtos;

public sealed record OrdersTimeseriesPointDto(DateTime PeriodStart, int Orders, decimal Revenue);
