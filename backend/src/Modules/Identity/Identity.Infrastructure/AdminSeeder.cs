using Identity.Application;
using Identity.Domain;
using Microsoft.EntityFrameworkCore;

namespace Identity.Infrastructure;

public static class AdminSeeder
{
    public static async Task SeedAsync(IdentityDbContext context, IPasswordHasherService passwordHasher, string? adminEmail, string? adminPassword, string? adminName, CancellationToken cancellationToken)
    {
        var roles = new[] { RoleNames.Admin, RoleNames.Manager, RoleNames.Support };
        foreach (var roleName in roles)
        {
            if (!await context.Roles.AnyAsync(r => r.Name == roleName, cancellationToken))
            {
                context.Roles.Add(new Role(roleName));
            }
        }

        await context.SaveChangesAsync(cancellationToken);

        if (string.IsNullOrWhiteSpace(adminEmail) || string.IsNullOrWhiteSpace(adminPassword))
        {
            return;
        }

        var email = adminEmail.Trim().ToLowerInvariant();
        var existing = await context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email, cancellationToken);
        if (existing == null)
        {
            var now = DateTime.UtcNow;
            var user = new User(Guid.NewGuid(), email, adminName?.Trim() ?? "Admin", string.Empty, now);
            var hash = passwordHasher.HashPassword(user, adminPassword);
            user = new User(user.Id, user.Email, user.Name, hash, user.CreatedAt);
            context.Users.Add(user);
            await context.SaveChangesAsync(cancellationToken);
            existing = user;
        }

        var hasRole = await context.UserRoles.AnyAsync(r => r.UserId == existing.Id && r.RoleName == RoleNames.Admin, cancellationToken);
        if (!hasRole)
        {
            context.UserRoles.Add(new UserRole(existing.Id, RoleNames.Admin));
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
