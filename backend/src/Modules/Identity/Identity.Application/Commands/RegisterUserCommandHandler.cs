using BuildingBlocks.Abstractions;
using Identity.Application.Dtos;
using Identity.Domain;
using MediatR;

namespace Identity.Application.Commands;

public sealed class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, UserDto>
{
    private readonly IIdentityDbContext _context;
    private readonly IPasswordHasherService _passwordHasher;
    private readonly IDateTimeProvider _dateTimeProvider;

    public RegisterUserCommandHandler(IIdentityDbContext context, IPasswordHasherService passwordHasher, IDateTimeProvider dateTimeProvider)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<UserDto> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        if (_context.Users.Any(u => u.Email.ToLower() == email))
        {
            throw new InvalidOperationException("Email is already registered.");
        }

        var user = new User(Guid.NewGuid(), email, request.Name.Trim(), string.Empty, _dateTimeProvider.UtcNow);
        var hash = _passwordHasher.HashPassword(user, request.Password);
        user = new User(user.Id, user.Email, user.Name, hash, user.CreatedAt);

        await _context.AddUserAsync(user, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new UserDto(user.Id.ToString(), user.Name, user.Email);
    }
}
