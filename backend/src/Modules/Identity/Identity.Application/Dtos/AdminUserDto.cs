namespace Identity.Application.Dtos;

public sealed record AdminUserDto(string Id, string Name, string Email, IReadOnlyList<string> Roles);
