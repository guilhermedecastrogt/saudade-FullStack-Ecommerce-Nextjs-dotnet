using Identity.Domain;

namespace Identity.Application;

public interface IJwtTokenService
{
    string CreateToken(User user, IReadOnlyList<string> roles);
}
