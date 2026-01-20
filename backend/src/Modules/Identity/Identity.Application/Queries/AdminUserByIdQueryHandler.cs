using Identity.Application.Dtos;
using MediatR;

namespace Identity.Application.Queries;

public sealed class AdminUserByIdQueryHandler : IRequestHandler<AdminUserByIdQuery, AdminUserDto?>
{
    private readonly IIdentityDbContext _context;

    public AdminUserByIdQueryHandler(IIdentityDbContext context)
    {
        _context = context;
    }

    public Task<AdminUserDto?> Handle(AdminUserByIdQuery request, CancellationToken cancellationToken)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == request.UserId);
        if (user == null)
        {
            return Task.FromResult<AdminUserDto?>(null);
        }

        var roles = _context.UserRoles.Where(r => r.UserId == user.Id).Select(r => r.RoleName).ToList();
        return Task.FromResult<AdminUserDto?>(new AdminUserDto(user.Id.ToString(), user.Name, user.Email, roles));
    }
}
