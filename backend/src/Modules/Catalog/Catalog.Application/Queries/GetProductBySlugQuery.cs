using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Queries;

public sealed record GetProductBySlugQuery(string Slug) : IRequest<ProductDto?>;
