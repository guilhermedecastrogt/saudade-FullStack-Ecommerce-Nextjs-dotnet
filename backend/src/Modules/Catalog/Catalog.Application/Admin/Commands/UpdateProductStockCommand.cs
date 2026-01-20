using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed record UpdateProductStockCommand(Guid ProductId, int Inventory) : IRequest<AdminProductDto>;
