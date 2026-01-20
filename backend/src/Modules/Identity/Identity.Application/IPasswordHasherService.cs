using Identity.Domain;

namespace Identity.Application;

public interface IPasswordHasherService
{
    string HashPassword(User user, string password);
    bool VerifyHashedPassword(User user, string hashedPassword, string providedPassword);
}
