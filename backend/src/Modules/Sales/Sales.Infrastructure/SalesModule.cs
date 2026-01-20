using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sales.Application;

namespace Sales.Infrastructure;

public static class SalesModule
{
    public static IServiceCollection AddSalesModule(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("SalesDb");
        if (!string.IsNullOrWhiteSpace(connectionString))
        {
            services.AddDbContext<SalesDbContext>(options => options.UseSqlServer(connectionString));
        }
        else
        {
            services.AddDbContext<SalesDbContext>(options => options.UseInMemoryDatabase("SalesDb"));
        }

        services.AddScoped<ISalesDbContext>(sp => sp.GetRequiredService<SalesDbContext>());

        return services;
    }
}
