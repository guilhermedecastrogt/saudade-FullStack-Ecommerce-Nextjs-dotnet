using Catalog.Domain;

namespace Catalog.Application;

public interface ICatalogDbContext
{
    IQueryable<Product> Products { get; }
    IQueryable<Category> Categories { get; }
    Task AddProductAsync(Product product, CancellationToken cancellationToken);
    Task AddCategoryAsync(Category category, CancellationToken cancellationToken);
    void RemoveProduct(Product product);
    void RemoveCategory(Category category);
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
