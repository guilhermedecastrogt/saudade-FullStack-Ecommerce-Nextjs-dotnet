namespace Identity.Application.Dtos;

public sealed record AdminAuthDto(string Token, AdminUserDto User);
