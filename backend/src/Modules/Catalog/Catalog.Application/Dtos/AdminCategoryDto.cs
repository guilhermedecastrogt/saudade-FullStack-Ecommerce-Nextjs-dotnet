namespace Catalog.Application.Dtos;

public sealed record AdminCategoryDto(string Id, string Slug, string Name, bool IsActive);
