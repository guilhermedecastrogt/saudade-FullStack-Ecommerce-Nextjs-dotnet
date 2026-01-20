using BuildingBlocks.Domain;

namespace Identity.Domain;

public sealed class User : AuditableEntity<Guid>
{
    public string Email { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;

    private User()
    {
    }

    public User(Guid id, string email, string name, string passwordHash, DateTime createdAt)
    {
        Id = id;
        Email = email;
        Name = name;
        PasswordHash = passwordHash;
        CreatedAt = createdAt;
        UpdatedAt = createdAt;
    }
}
