using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Queries;

public sealed record AdminProductByIdQuery(Guid ProductId) : IRequest<AdminProductDto?>;
