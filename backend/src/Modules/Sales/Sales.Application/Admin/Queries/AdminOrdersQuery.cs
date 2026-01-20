using Sales.Application.Dtos;
using Sales.Domain;
using MediatR;

namespace Sales.Application.Admin.Queries;

public sealed record AdminOrdersQuery(OrderStatus? Status, DateTime? From, DateTime? To, int Page, int PageSize) : IRequest<AdminOrdersResult>;
