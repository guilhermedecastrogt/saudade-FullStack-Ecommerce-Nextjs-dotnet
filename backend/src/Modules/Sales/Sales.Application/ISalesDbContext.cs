using Sales.Domain;

namespace Sales.Application;

public interface ISalesDbContext
{
    IQueryable<Cart> Carts { get; }
    IQueryable<CartItem> CartItems { get; }
    IQueryable<Order> Orders { get; }
    IQueryable<OrderItem> OrderItems { get; }
    Task AddCartAsync(Cart cart, CancellationToken cancellationToken);
    Task AddCartItemAsync(CartItem item, CancellationToken cancellationToken);
    Task AddOrderAsync(Order order, CancellationToken cancellationToken);
    Task AddOrderItemAsync(OrderItem item, CancellationToken cancellationToken);
    void UpdateOrderStatus(Order order, OrderStatus status, DateTime updatedAt);
    void RemoveCartItem(CartItem item);
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
