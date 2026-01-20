using Microsoft.EntityFrameworkCore;
using Sales.Application;
using Sales.Domain;

namespace Sales.Infrastructure;

public sealed class SalesDbContext : DbContext, ISalesDbContext
{
    public SalesDbContext(DbContextOptions<SalesDbContext> options) : base(options)
    {
    }

    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    IQueryable<Cart> ISalesDbContext.Carts => Carts;
    IQueryable<CartItem> ISalesDbContext.CartItems => CartItems;
    IQueryable<Order> ISalesDbContext.Orders => Orders;
    IQueryable<OrderItem> ISalesDbContext.OrderItems => OrderItems;

    public Task AddCartAsync(Cart cart, CancellationToken cancellationToken)
    {
        Carts.Add(cart);
        return Task.CompletedTask;
    }

    public Task AddCartItemAsync(CartItem item, CancellationToken cancellationToken)
    {
        CartItems.Add(item);
        return Task.CompletedTask;
    }

    public Task AddOrderAsync(Order order, CancellationToken cancellationToken)
    {
        Orders.Add(order);
        return Task.CompletedTask;
    }

    public Task AddOrderItemAsync(OrderItem item, CancellationToken cancellationToken)
    {
        OrderItems.Add(item);
        return Task.CompletedTask;
    }

    public void UpdateOrderStatus(Order order, OrderStatus status, DateTime updatedAt)
    {
        Entry(order).Property(o => o.Status).CurrentValue = status;
        Entry(order).Property(o => o.UpdatedAt).CurrentValue = updatedAt;
    }

    public void RemoveCartItem(CartItem item)
    {
        CartItems.Remove(item);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken)
    {
        return base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.HasMany(c => c.Items).WithOne().HasForeignKey(i => i.CartId);
        });

        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.HasKey(i => i.Id);
            entity.OwnsOne(i => i.UnitPrice, price =>
            {
                price.Property(p => p.Amount).HasColumnName("UnitPriceAmount");
                price.Property(p => p.Currency).HasColumnName("UnitPriceCurrency");
            });
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(o => o.Id);
            entity.Property(o => o.OrderNumber).IsRequired();
            entity.OwnsOne(o => o.ShippingAddress, address =>
            {
                address.Property(a => a.FirstName).HasColumnName("ShippingFirstName");
                address.Property(a => a.LastName).HasColumnName("ShippingLastName");
                address.Property(a => a.Email).HasColumnName("ShippingEmail");
                address.Property(a => a.Line1).HasColumnName("ShippingLine1");
                address.Property(a => a.City).HasColumnName("ShippingCity");
                address.Property(a => a.PostalCode).HasColumnName("ShippingPostalCode");
                address.Property(a => a.Country).HasColumnName("ShippingCountry");
            });
            entity.OwnsOne(o => o.Subtotal, price =>
            {
                price.Property(p => p.Amount).HasColumnName("SubtotalAmount");
                price.Property(p => p.Currency).HasColumnName("SubtotalCurrency");
            });
            entity.OwnsOne(o => o.Shipping, price =>
            {
                price.Property(p => p.Amount).HasColumnName("ShippingAmount");
                price.Property(p => p.Currency).HasColumnName("ShippingCurrency");
            });
            entity.OwnsOne(o => o.Total, price =>
            {
                price.Property(p => p.Amount).HasColumnName("TotalAmount");
                price.Property(p => p.Currency).HasColumnName("TotalCurrency");
            });
            entity.HasMany(o => o.Items).WithOne().HasForeignKey(i => i.OrderId);
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(i => i.Id);
            entity.OwnsOne(i => i.UnitPrice, price =>
            {
                price.Property(p => p.Amount).HasColumnName("UnitPriceAmount");
                price.Property(p => p.Currency).HasColumnName("UnitPriceCurrency");
            });
        });
    }
}
