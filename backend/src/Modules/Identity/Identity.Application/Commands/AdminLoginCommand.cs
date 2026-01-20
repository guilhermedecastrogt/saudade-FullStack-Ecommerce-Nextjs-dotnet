using Identity.Application.Dtos;
using MediatR;

namespace Identity.Application.Commands;

public sealed record AdminLoginCommand(string Email, string Password) : IRequest<AdminAuthDto?>;
