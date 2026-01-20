namespace BuildingBlocks.Web;

public sealed record ApiError(string Code, string Message, object? Details = null);

public sealed record ApiErrorResponse(ApiError Error);
