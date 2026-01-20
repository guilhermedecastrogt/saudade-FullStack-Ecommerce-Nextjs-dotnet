using Identity.Application.Dtos;
using MediatR;

namespace Identity.Application.Queries;

public sealed class AdminUsersQueryHandler : IRequestHandler<AdminUsersQuery, AdminUsersResult>
{
    private readonly IIdentityDbContext _context;

    public AdminUsersQueryHandler(IIdentityDbContext context)
    {
        _context = context;
    }

    public Task<AdminUsersResult> Handle(AdminUsersQuery request, CancellationToken cancellationToken)
    {
        var page = request.Page <= 0 ? 1 : request.Page;
        var pageSize = request.PageSize <= 0 ? 20 : request.PageSize;

        var total = _context.Users.Count();
        var users = _context.Users
            .OrderByDescending(u => u.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var rolesByUser = _context.UserRoles
            .Where(r => users.Select(u => u.Id).Contains(r.UserId))
            .GroupBy(r => r.UserId)
            .ToDictionary(g => g.Key, g => g.Select(r => r.RoleName).ToList());

        var items = users.Select(user =>
        {
            rolesByUser.TryGetValue(user.Id, out var roles);
            return new AdminUserDto(user.Id.ToString(), user.Name, user.Email, roles?.ToArray() ?? Array.Empty<string>());
        }).ToList();

        return Task.FromResult(new AdminUsersResult(items, total, page, pageSize));
    }
}
