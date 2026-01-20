using Identity.Application.Dtos;
using MediatR;

namespace Identity.Application.Queries;

public sealed record AdminMeQuery(Guid UserId) : IRequest<AdminUserDto?>;
