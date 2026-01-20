namespace Sales.Application.Dtos;

public sealed record AddressDto(
    string FirstName,
    string LastName,
    string Email,
    string Line1,
    string City,
    string PostalCode,
    string Country
);
