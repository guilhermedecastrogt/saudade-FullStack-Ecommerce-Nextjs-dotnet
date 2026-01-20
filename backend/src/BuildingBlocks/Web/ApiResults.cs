using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BuildingBlocks.Web;

public static class ApiResults
{
    public static Ok<ApiResponse<T>> Ok<T>(T data, ApiMeta? meta = null)
    {
        return TypedResults.Ok(new ApiResponse<T>(data, meta));
    }

    public static Created<ApiResponse<T>> Created<T>(string uri, T data)
    {
        return TypedResults.Created(uri, new ApiResponse<T>(data));
    }

    public static BadRequest<ApiErrorResponse> BadRequest(string code, string message, object? details = null)
    {
        return TypedResults.BadRequest(new ApiErrorResponse(new ApiError(code, message, details)));
    }

    public static NotFound<ApiErrorResponse> NotFound(string code, string message)
    {
        return TypedResults.NotFound(new ApiErrorResponse(new ApiError(code, message)));
    }

    public static IResult Unauthorized(string code, string message)
    {
        return Results.Json(new ApiErrorResponse(new ApiError(code, message)), statusCode: StatusCodes.Status401Unauthorized);
    }
}
