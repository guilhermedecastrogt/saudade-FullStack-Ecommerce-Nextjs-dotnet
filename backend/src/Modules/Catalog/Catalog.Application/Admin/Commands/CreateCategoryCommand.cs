using Catalog.Application.Dtos;
using MediatR;

namespace Catalog.Application.Admin.Commands;

public sealed record CreateCategoryCommand(string Slug, string Name, bool IsActive) : IRequest<AdminCategoryDto>;
