using Identity.Application.Dtos;
using MediatR;

namespace Identity.Application.Queries;

public sealed record AdminUsersQuery(int Page, int PageSize) : IRequest<AdminUsersResult>;
