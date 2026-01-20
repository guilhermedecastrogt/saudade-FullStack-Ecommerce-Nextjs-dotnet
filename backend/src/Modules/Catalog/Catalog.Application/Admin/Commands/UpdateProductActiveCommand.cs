using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed record UpdateProductActiveCommand(Guid ProductId, bool IsActive) : IRequest<AdminProductDto>;
