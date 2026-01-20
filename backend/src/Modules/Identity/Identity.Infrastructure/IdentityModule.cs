using Identity.Application;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Identity.Infrastructure;

public static class IdentityModule
{
    public static IServiceCollection AddIdentityModule(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("IdentityDb");
        if (!string.IsNullOrWhiteSpace(connectionString))
        {
            services.AddDbContext<IdentityDbContext>(options => options.UseSqlServer(connectionString));
        }
        else
        {
            services.AddDbContext<IdentityDbContext>(options => options.UseInMemoryDatabase("IdentityDb"));
        }

        services.AddScoped<IIdentityDbContext>(sp => sp.GetRequiredService<IdentityDbContext>());
        services.AddSingleton<IPasswordHasherService, PasswordHasherService>();
        services.Configure<JwtOptions>(configuration.GetSection("Jwt"));
        services.AddSingleton<IJwtTokenService, JwtTokenService>();

        return services;
    }
}
