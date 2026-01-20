using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Queries;

public sealed record CatalogSummaryQuery(int LowStockThreshold) : IRequest<CatalogSummaryDto>;
