namespace BuildingBlocks.Web;

public sealed record ApiResponse<T>(T Data, ApiMeta? Meta = null);

public sealed record ApiMeta(int? Total = null, int? Page = null, int? PageSize = null);
