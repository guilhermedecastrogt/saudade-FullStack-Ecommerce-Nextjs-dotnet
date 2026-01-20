namespace Identity.Application;

public sealed class JwtOptions
{
    public string Issuer { get; init; } = "Saudade";
    public string Audience { get; init; } = "SaudadeAdmin";
    public string Secret { get; init; } = string.Empty;
    public int ExpiresInMinutes { get; init; } = 120;
}
