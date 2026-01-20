using Identity.Application.Dtos;
using MediatR;

namespace Identity.Application.Commands;

public sealed class LoginCommandHandler : IRequestHandler<LoginCommand, UserDto?>
{
    private readonly IIdentityDbContext _context;
    private readonly IPasswordHasherService _passwordHasher;

    public LoginCommandHandler(IIdentityDbContext context, IPasswordHasherService passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    public Task<UserDto?> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = _context.Users.FirstOrDefault(u => u.Email.ToLower() == email);
        if (user == null)
        {
            return Task.FromResult<UserDto?>(null);
        }

        if (!_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password))
        {
            return Task.FromResult<UserDto?>(null);
        }

        return Task.FromResult<UserDto?>(new UserDto(user.Id.ToString(), user.Name, user.Email));
    }
}
