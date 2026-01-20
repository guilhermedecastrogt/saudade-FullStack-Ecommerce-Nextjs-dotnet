using Catalog.Domain;
using BuildingBlocks.Domain;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Infrastructure;

public static class CatalogSeeder
{
    public static async Task SeedAsync(CatalogDbContext context, CancellationToken cancellationToken)
    {
        if (await context.Categories.AnyAsync(cancellationToken))
        {
            return;
        }

        var now = DateTime.UtcNow;
        var women = new Category(Guid.NewGuid(), "women", "Women", true, now, now);
        var men = new Category(Guid.NewGuid(), "men", "Men", true, now, now);
        var accessories = new Category(Guid.NewGuid(), "accessories", "Accessories", true, now, now);

        var products = new[]
        {
            new Product(Guid.NewGuid(), "linen-wrap-dress", "Linen Wrap Dress", "Breathable linen dress with a flattering wrap silhouette.", new Money(129, "EUR"), new[] { "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop" }, new[] { "XS", "S", "M", "L" }, new[] { "Sand", "Olive" }, 4.7m, 18, true, true, false, true, women.Id, now, now),
            new Product(Guid.NewGuid(), "merino-knit-sweater", "Merino Knit Sweater", "Soft merino knit designed for everyday comfort.", new Money(99, "EUR"), new[] { "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1200&auto=format&fit=crop" }, new[] { "S", "M", "L", "XL" }, new[] { "Navy", "Oat" }, 4.6m, 25, false, true, false, true, men.Id, now, now),
            new Product(Guid.NewGuid(), "structured-tote-bag", "Structured Tote Bag", "Minimalist tote with structured lines and generous storage.", new Money(149, "EUR"), new[] { "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop" }, new[] { "One Size" }, new[] { "Black", "Taupe" }, 4.8m, 9, false, true, false, true, accessories.Id, now, now),
            new Product(Guid.NewGuid(), "silk-blouse", "Silk Blouse", "Lightweight silk blouse with subtle sheen.", new Money(119, "EUR"), new[] { "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop" }, new[] { "XS", "S", "M", "L" }, new[] { "Ivory", "Rose" }, 4.5m, 14, true, false, false, true, women.Id, now, now),
            new Product(Guid.NewGuid(), "tailored-chinos", "Tailored Chinos", "Clean-cut chinos with modern taper.", new Money(89, "EUR"), new[] { "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop" }, new[] { "30", "32", "34", "36" }, new[] { "Stone", "Charcoal" }, 4.3m, 30, false, false, true, true, men.Id, now, now),
            new Product(Guid.NewGuid(), "cashmere-scarf", "Cashmere Scarf", "Luxurious cashmere scarf for cooler days.", new Money(79, "EUR"), new[] { "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop" }, new[] { "One Size" }, new[] { "Camel", "Burgundy" }, 4.9m, 22, false, true, false, true, accessories.Id, now, now)
        };

        await context.Categories.AddRangeAsync(new[] { women, men, accessories }, cancellationToken);
        await context.Products.AddRangeAsync(products, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }
}
