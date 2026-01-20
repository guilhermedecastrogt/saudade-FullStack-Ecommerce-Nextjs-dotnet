using MediatR;
using Sales.Application.Dtos;

namespace Sales.Application.Admin.Queries;

public sealed record OrdersTimeseriesQuery(DateTime From, DateTime To, string Bucket) : IRequest<IReadOnlyList<OrdersTimeseriesPointDto>>;
