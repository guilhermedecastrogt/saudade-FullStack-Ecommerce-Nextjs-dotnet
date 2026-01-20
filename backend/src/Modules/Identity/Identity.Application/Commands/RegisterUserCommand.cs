using Identity.Application.Dtos;
using MediatR;

namespace Identity.Application.Commands;

public sealed record RegisterUserCommand(string Name, string Email, string Password) : IRequest<UserDto>;
