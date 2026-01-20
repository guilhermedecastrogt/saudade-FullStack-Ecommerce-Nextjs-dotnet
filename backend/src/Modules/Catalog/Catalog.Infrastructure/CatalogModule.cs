using Catalog.Application;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Catalog.Infrastructure;

public static class CatalogModule
{
    public static IServiceCollection AddCatalogModule(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("CatalogDb");
        if (!string.IsNullOrWhiteSpace(connectionString))
        {
            services.AddDbContext<CatalogDbContext>(options => options.UseSqlServer(connectionString));
        }
        else
        {
            services.AddDbContext<CatalogDbContext>(options => options.UseInMemoryDatabase("CatalogDb"));
        }

        services.AddScoped<ICatalogDbContext>(sp => sp.GetRequiredService<CatalogDbContext>());

        return services;
    }
}
