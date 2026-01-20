using MediatR;
using Sales.Application.Dtos;

namespace Sales.Application.Admin.Queries;

public sealed class OrdersTimeseriesQueryHandler : IRequestHandler<OrdersTimeseriesQuery, IReadOnlyList<OrdersTimeseriesPointDto>>
{
    private readonly ISalesDbContext _context;

    public OrdersTimeseriesQueryHandler(ISalesDbContext context)
    {
        _context = context;
    }

    public Task<IReadOnlyList<OrdersTimeseriesPointDto>> Handle(OrdersTimeseriesQuery request, CancellationToken cancellationToken)
    {
        var from = request.From;
        var to = request.To;
        var bucket = request.Bucket.ToLowerInvariant();

        var orders = _context.Orders
            .Where(o => o.CreatedAt >= from && o.CreatedAt <= to)
            .ToList();

        var grouped = orders
            .GroupBy(order =>
            {
                var date = order.CreatedAt.Date;
                if (bucket == "week")
                {
                    var diff = (7 + (date.DayOfWeek - DayOfWeek.Monday)) % 7;
                    return date.AddDays(-diff);
                }

                return date;
            })
            .Select(group => new OrdersTimeseriesPointDto(group.Key, group.Count(), group.Sum(o => o.Total.Amount)))
            .OrderBy(point => point.PeriodStart)
            .ToList();

        return Task.FromResult<IReadOnlyList<OrdersTimeseriesPointDto>>(grouped);
    }
}
