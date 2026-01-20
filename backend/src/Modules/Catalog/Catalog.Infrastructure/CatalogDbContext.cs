using Catalog.Application;
using Catalog.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;

namespace Catalog.Infrastructure;

public sealed class CatalogDbContext : DbContext, ICatalogDbContext
{
    public CatalogDbContext(DbContextOptions<CatalogDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();

    IQueryable<Product> ICatalogDbContext.Products => Products;
    IQueryable<Category> ICatalogDbContext.Categories => Categories;

    public Task AddProductAsync(Product product, CancellationToken cancellationToken)
    {
        Products.Add(product);
        return Task.CompletedTask;
    }

    public Task AddCategoryAsync(Category category, CancellationToken cancellationToken)
    {
        Categories.Add(category);
        return Task.CompletedTask;
    }

    public void RemoveProduct(Product product)
    {
        Products.Remove(product);
    }

    public void RemoveCategory(Category category)
    {
        Categories.Remove(category);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken)
    {
        return base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var arrayConverter = new ValueConverter<string[], string>(
            v => JsonSerializer.Serialize(v, JsonSerializerOptions.Default),
            v => string.IsNullOrWhiteSpace(v) ? Array.Empty<string>() : JsonSerializer.Deserialize<string[]>(v, JsonSerializerOptions.Default) ?? Array.Empty<string>()
        );

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Slug).IsRequired();
            entity.Property(c => c.Name).IsRequired();
            entity.HasIndex(c => c.Slug).IsUnique();
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Slug).IsRequired();
            entity.Property(p => p.Name).IsRequired();
            entity.Property(p => p.Description).IsRequired();
            entity.Property(p => p.Images).HasConversion(arrayConverter);
            entity.Property(p => p.Sizes).HasConversion(arrayConverter);
            entity.Property(p => p.Colors).HasConversion(arrayConverter);
            entity.OwnsOne(p => p.Price, price =>
            {
                price.Property(p => p.Amount).HasColumnName("PriceAmount");
                price.Property(p => p.Currency).HasColumnName("PriceCurrency");
            });
            entity.HasOne(p => p.Category).WithMany().HasForeignKey(p => p.CategoryId);
            entity.HasIndex(p => p.Slug).IsUnique();
        });
    }
}
