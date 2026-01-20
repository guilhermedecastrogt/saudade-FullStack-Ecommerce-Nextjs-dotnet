using Identity.Application.Dtos;

namespace Identity.Application.Queries;

public sealed record AdminUsersResult(IReadOnlyList<AdminUserDto> Items, int Total, int Page, int PageSize);
