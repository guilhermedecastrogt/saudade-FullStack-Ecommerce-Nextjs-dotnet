using MediatR;
using Sales.Application.Dtos;

namespace Sales.Application.Admin.Queries;

public sealed record SalesSummaryQuery : IRequest<SalesSummaryDto>;
