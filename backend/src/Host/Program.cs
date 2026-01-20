using BuildingBlocks.Abstractions;
using BuildingBlocks.Infrastructure;
using BuildingBlocks.Web;
using Catalog.Application.Queries;
using Catalog.Application.Admin.Queries;
using Catalog.Application.Admin.Commands;
using Catalog.Infrastructure;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Sales.Infrastructure;
using Sales.Application.Commands;
using Sales.Application.Queries;
using Sales.Application.Admin.Queries;
using Sales.Application.Admin.Commands;
using Sales.Domain;
using Identity.Application.Commands;
using Identity.Application.Queries;
using Identity.Infrastructure;
using Identity.Application;
using Identity.Domain;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text;
 
var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, logger) =>
{
    logger.ReadFrom.Configuration(context.Configuration);
    logger.WriteTo.Console();
});
 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
builder.Services.AddScoped<ICurrentUser, CurrentUser>();
builder.Services.AddCatalogModule(builder.Configuration);
builder.Services.AddSalesModule(builder.Configuration);
builder.Services.AddIdentityModule(builder.Configuration);
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(
    typeof(GetProductsQuery).Assembly,
    typeof(GetCartQuery).Assembly,
    typeof(GetOrdersQuery).Assembly,
    typeof(RegisterUserCommand).Assembly
));
builder.Services.AddValidatorsFromAssemblies(new[]
{
    typeof(GetProductsQuery).Assembly,
    typeof(GetCartQuery).Assembly,
    typeof(RegisterUserCommand).Assembly
});
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtOptions = jwtSection.Get<JwtOptions>() ?? new JwtOptions();
builder.Services.Configure<JwtOptions>(jwtSection);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidAudience = jwtOptions.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole(RoleNames.Admin));
    options.AddPolicy("ManagerAccess", policy => policy.RequireRole(RoleNames.Admin, RoleNames.Manager));
    options.AddPolicy("SupportAccess", policy => policy.RequireRole(RoleNames.Admin, RoleNames.Manager, RoleNames.Support));
});
  
var app = builder.Build();
 
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSerilogRequestLogging();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (NotFoundException ex)
    {
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        await context.Response.WriteAsJsonAsync(new ApiErrorResponse(new ApiError("not_found", ex.Message)));
    }
    catch (ValidationException ex)
    {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        await context.Response.WriteAsJsonAsync(new ApiErrorResponse(new ApiError("validation_error", ex.Message)));
    }
    catch (InvalidOperationException ex)
    {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        await context.Response.WriteAsJsonAsync(new ApiErrorResponse(new ApiError("invalid_operation", ex.Message)));
    }
});
 
app.MapGet("/", () => "Saudade API");
app.MapHealthChecks("/health");
 
app.MapGet("/api/catalog/products", async (string? category, string? q, string? sort, decimal? minPrice, decimal? maxPrice, int page, int pageSize, ISender sender) =>
{
    var result = await sender.Send(new GetProductsQuery(category, q, sort, minPrice, maxPrice, page <= 0 ? 1 : page, pageSize <= 0 ? 20 : pageSize));
    return ApiResults.Ok(result.Items, new ApiMeta(result.Total, result.Page, result.PageSize));
});
 
app.MapGet("/api/catalog/products/{slug}", async (HttpContext context) =>
{
    var slug = context.Request.RouteValues["slug"]?.ToString();
    if (string.IsNullOrWhiteSpace(slug))
    {
        return ApiResults.NotFound("product_not_found", "Product not found");
    }

    var sender = context.RequestServices.GetRequiredService<ISender>();
    var product = await sender.Send(new GetProductBySlugQuery(slug));
    IResult response = product is null
        ? ApiResults.NotFound("product_not_found", "Product not found")
        : ApiResults.Ok(product);
    return response;
});
 
app.MapGet("/api/catalog/categories", async (ISender sender) =>
{
    var categories = await sender.Send(new GetCategoriesQuery());
    return ApiResults.Ok(categories);
});
 
app.MapPost("/api/sales/carts", async (Guid? cartId, ISender sender) =>
{
    var cart = await sender.Send(new CreateCartCommand(cartId));
    return ApiResults.Created($"/api/sales/carts/{cart.Id}", cart);
});
 
app.MapGet("/api/sales/carts/{id:guid}", async (Guid id, ISender sender) =>
{
    var cart = await sender.Send(new GetCartQuery(id));
    return ApiResults.Ok(cart);
});
 
app.MapPost("/api/sales/carts/{id:guid}/items", async (Guid id, AddCartItemCommand body, ISender sender) =>
{
    var cart = await sender.Send(body with { CartId = id });
    return ApiResults.Ok(cart);
});
 
app.MapPut("/api/sales/carts/{id:guid}/items/{itemId:guid}", async (Guid id, Guid itemId, UpdateCartItemCommand body, ISender sender) =>
{
    var cart = await sender.Send(body with { CartId = id, ItemId = itemId });
    return ApiResults.Ok(cart);
});
 
app.MapDelete("/api/sales/carts/{id:guid}/items/{itemId:guid}", async (Guid id, Guid itemId, ISender sender) =>
{
    var cart = await sender.Send(new RemoveCartItemCommand(id, itemId));
    return ApiResults.Ok(cart);
});
 
app.MapPost("/api/sales/orders", async (CreateOrderCommand body, ISender sender) =>
{
    var order = await sender.Send(body);
    return ApiResults.Created($"/api/sales/orders/{order.Id}", order);
});
 
app.MapGet("/api/sales/orders", async (ISender sender) =>
{
    var orders = await sender.Send(new GetOrdersQuery());
    return ApiResults.Ok(orders);
});
 
app.MapGet("/api/sales/orders/{id:guid}", async (HttpContext context) =>
{
    var idText = context.Request.RouteValues["id"]?.ToString();
    if (!Guid.TryParse(idText, out var id))
    {
        return ApiResults.NotFound("order_not_found", "Order not found");
    }

    var sender = context.RequestServices.GetRequiredService<ISender>();
    var order = await sender.Send(new GetOrderByIdQuery(id));
    IResult response = order is null
        ? ApiResults.NotFound("order_not_found", "Order not found")
        : ApiResults.Ok(order);
    return response;
});

app.MapPost("/api/identity/register", async (RegisterUserCommand body, ISender sender) =>
{
    var user = await sender.Send(body);
    return ApiResults.Created($"/api/identity/users/{user.Id}", user);
});

app.MapPost("/api/identity/login", async (LoginCommand body, ISender sender) =>
{
    var user = await sender.Send(body);
    return user is null ? ApiResults.Unauthorized("invalid_credentials", "Invalid email or password") : ApiResults.Ok(user);
});

app.MapPost("/api/admin/auth/login", async (AdminLoginCommand body, ISender sender) =>
{
    var result = await sender.Send(body);
    return result is null ? ApiResults.Unauthorized("invalid_credentials", "Invalid admin credentials") : ApiResults.Ok(result);
});

app.MapGet("/api/admin/me", async (ICurrentUser currentUser, ISender sender) =>
{
    if (!currentUser.UserId.HasValue)
    {
        return ApiResults.Unauthorized("unauthorized", "Unauthorized");
    }

    var user = await sender.Send(new AdminMeQuery(currentUser.UserId.Value));
    return user is null ? ApiResults.Unauthorized("unauthorized", "Unauthorized") : ApiResults.Ok(user);
}).RequireAuthorization();

app.MapGet("/api/admin/users", async (int page, int pageSize, ISender sender) =>
{
    var result = await sender.Send(new AdminUsersQuery(page <= 0 ? 1 : page, pageSize <= 0 ? 20 : pageSize));
    return ApiResults.Ok(result.Items, new ApiMeta(result.Total, result.Page, result.PageSize));
}).RequireAuthorization("SupportAccess");

app.MapGet("/api/admin/users/{id:guid}", async (HttpContext context) =>
{
    var idText = context.Request.RouteValues["id"]?.ToString();
    if (!Guid.TryParse(idText, out var id))
    {
        return ApiResults.NotFound("user_not_found", "User not found");
    }

    var sender = context.RequestServices.GetRequiredService<ISender>();
    var user = await sender.Send(new AdminUserByIdQuery(id));
    IResult response = user is null
        ? ApiResults.NotFound("user_not_found", "User not found")
        : ApiResults.Ok(user);
    return response;
}).RequireAuthorization("SupportAccess");

app.MapGet("/api/admin/dashboard/summary", async (ISender sender) =>
{
    var salesSummary = await sender.Send(new SalesSummaryQuery());
    var catalogSummary = await sender.Send(new CatalogSummaryQuery(5));
    return ApiResults.Ok(new
    {
        salesSummary.TotalOrders,
        salesSummary.TotalRevenue,
        salesSummary.PendingOrders,
        catalogSummary.LowStockProducts,
        catalogSummary.ActiveProducts,
        RecentOrders = salesSummary.RecentOrders
    });
}).RequireAuthorization("ManagerAccess");

app.MapGet("/api/admin/dashboard/orders-timeseries", async (DateTime from, DateTime to, string bucket, ISender sender) =>
{
    var points = await sender.Send(new OrdersTimeseriesQuery(from, to, bucket));
    return ApiResults.Ok(points);
}).RequireAuthorization("ManagerAccess");

app.MapGet("/api/admin/products", async (string? search, string? category, bool? active, int page, int pageSize, ISender sender) =>
{
    var result = await sender.Send(new AdminProductsQuery(search, category, active, page <= 0 ? 1 : page, pageSize <= 0 ? 20 : pageSize));
    return ApiResults.Ok(result.Items, new ApiMeta(result.Total, result.Page, result.PageSize));
}).RequireAuthorization("AdminOnly");

app.MapGet("/api/admin/products/{id:guid}", async (HttpContext context) =>
{
    var idText = context.Request.RouteValues["id"]?.ToString();
    if (!Guid.TryParse(idText, out var id))
    {
        return ApiResults.NotFound("product_not_found", "Product not found");
    }

    var sender = context.RequestServices.GetRequiredService<ISender>();
    var product = await sender.Send(new AdminProductByIdQuery(id));
    IResult response = product is null
        ? ApiResults.NotFound("product_not_found", "Product not found")
        : ApiResults.Ok(product);
    return response;
}).RequireAuthorization("AdminOnly");

app.MapPost("/api/admin/products", async (CreateProductCommand body, ISender sender) =>
{
    var product = await sender.Send(body);
    return ApiResults.Created($"/api/admin/products/{product.Id}", product);
}).RequireAuthorization("AdminOnly");

app.MapPut("/api/admin/products/{id:guid}", async (Guid id, UpdateProductCommand body, ISender sender) =>
{
    var product = await sender.Send(body with { ProductId = id });
    return ApiResults.Ok(product);
}).RequireAuthorization("AdminOnly");

app.MapPatch("/api/admin/products/{id:guid}/active", async (Guid id, UpdateProductActiveCommand body, ISender sender) =>
{
    var product = await sender.Send(body with { ProductId = id });
    return ApiResults.Ok(product);
}).RequireAuthorization("AdminOnly");

app.MapPatch("/api/admin/products/{id:guid}/stock", async (Guid id, UpdateProductStockCommand body, ISender sender) =>
{
    var product = await sender.Send(body with { ProductId = id });
    return ApiResults.Ok(product);
}).RequireAuthorization("AdminOnly");

app.MapGet("/api/admin/categories", async (bool? active, ISender sender) =>
{
    var categories = await sender.Send(new AdminCategoriesQuery(active));
    return ApiResults.Ok(categories);
}).RequireAuthorization("AdminOnly");

app.MapPost("/api/admin/categories", async (CreateCategoryCommand body, ISender sender) =>
{
    var category = await sender.Send(body);
    return ApiResults.Created($"/api/admin/categories/{category.Id}", category);
}).RequireAuthorization("AdminOnly");

app.MapPut("/api/admin/categories/{id:guid}", async (Guid id, UpdateCategoryCommand body, ISender sender) =>
{
    var category = await sender.Send(body with { CategoryId = id });
    return ApiResults.Ok(category);
}).RequireAuthorization("AdminOnly");

app.MapPatch("/api/admin/categories/{id:guid}/active", async (Guid id, UpdateCategoryActiveCommand body, ISender sender) =>
{
    var category = await sender.Send(body with { CategoryId = id });
    return ApiResults.Ok(category);
}).RequireAuthorization("AdminOnly");

app.MapGet("/api/admin/orders", async (OrderStatus? status, DateTime? from, DateTime? to, int page, int pageSize, ISender sender) =>
{
    var result = await sender.Send(new AdminOrdersQuery(status, from, to, page <= 0 ? 1 : page, pageSize <= 0 ? 20 : pageSize));
    return ApiResults.Ok(result.Items, new ApiMeta(result.Total, result.Page, result.PageSize));
}).RequireAuthorization("ManagerAccess");

app.MapGet("/api/admin/orders/{id:guid}", async (HttpContext context) =>
{
    var idText = context.Request.RouteValues["id"]?.ToString();
    if (!Guid.TryParse(idText, out var id))
    {
        return ApiResults.NotFound("order_not_found", "Order not found");
    }

    var sender = context.RequestServices.GetRequiredService<ISender>();
    var order = await sender.Send(new GetOrderByIdQuery(id));
    IResult response = order is null
        ? ApiResults.NotFound("order_not_found", "Order not found")
        : ApiResults.Ok(order);
    return response;
}).RequireAuthorization("SupportAccess");

app.MapPatch("/api/admin/orders/{id:guid}/status", async (Guid id, UpdateOrderStatusCommand body, ISender sender) =>
{
    var order = await sender.Send(body with { OrderId = id });
    return ApiResults.Ok(order);
}).RequireAuthorization("ManagerAccess");

await using (var scope = app.Services.CreateAsyncScope())
{
    var catalogDb = scope.ServiceProvider.GetRequiredService<CatalogDbContext>();
    await catalogDb.Database.EnsureCreatedAsync();
    await CatalogSeeder.SeedAsync(catalogDb, CancellationToken.None);

    var identityDb = scope.ServiceProvider.GetRequiredService<IdentityDbContext>();
    await identityDb.Database.EnsureCreatedAsync();
    var hasher = scope.ServiceProvider.GetRequiredService<IPasswordHasherService>();
    var adminEmail = builder.Configuration["ADMIN_EMAIL"];
    var adminPassword = builder.Configuration["ADMIN_PASSWORD"];
    var adminName = builder.Configuration["ADMIN_NAME"];
    await AdminSeeder.SeedAsync(identityDb, hasher, adminEmail, adminPassword, adminName, CancellationToken.None);

    var salesDb = scope.ServiceProvider.GetRequiredService<SalesDbContext>();
    await salesDb.Database.EnsureCreatedAsync();
}
 
app.Run();
