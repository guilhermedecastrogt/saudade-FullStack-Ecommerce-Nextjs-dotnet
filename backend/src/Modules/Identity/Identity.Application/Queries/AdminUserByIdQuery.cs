using Identity.Application.Dtos;
using MediatR;

namespace Identity.Application.Queries;

public sealed record AdminUserByIdQuery(Guid UserId) : IRequest<AdminUserDto?>;
