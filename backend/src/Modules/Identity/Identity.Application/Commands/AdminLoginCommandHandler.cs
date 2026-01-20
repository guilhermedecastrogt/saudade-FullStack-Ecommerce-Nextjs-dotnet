using Identity.Application.Dtos;
using Identity.Domain;
using MediatR;

namespace Identity.Application.Commands;

public sealed class AdminLoginCommandHandler : IRequestHandler<AdminLoginCommand, AdminAuthDto?>
{
    private readonly IIdentityDbContext _context;
    private readonly IPasswordHasherService _passwordHasher;
    private readonly IJwtTokenService _jwtTokenService;

    public AdminLoginCommandHandler(IIdentityDbContext context, IPasswordHasherService passwordHasher, IJwtTokenService jwtTokenService)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _jwtTokenService = jwtTokenService;
    }

    public Task<AdminAuthDto?> Handle(AdminLoginCommand request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = _context.Users.FirstOrDefault(u => u.Email.ToLower() == email);
        if (user == null)
        {
            return Task.FromResult<AdminAuthDto?>(null);
        }

        if (!_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password))
        {
            return Task.FromResult<AdminAuthDto?>(null);
        }

        var roles = _context.UserRoles.Where(r => r.UserId == user.Id).Select(r => r.RoleName).ToList();
        if (!roles.Any(role => role == RoleNames.Admin || role == RoleNames.Manager || role == RoleNames.Support))
        {
            return Task.FromResult<AdminAuthDto?>(null);
        }

        var token = _jwtTokenService.CreateToken(user, roles);
        var dto = new AdminAuthDto(token, new AdminUserDto(user.Id.ToString(), user.Name, user.Email, roles));
        return Task.FromResult<AdminAuthDto?>(dto);
    }
}
