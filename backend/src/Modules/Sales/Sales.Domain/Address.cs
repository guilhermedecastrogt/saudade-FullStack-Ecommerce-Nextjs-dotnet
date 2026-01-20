using BuildingBlocks.Domain;

namespace Sales.Domain;

public sealed class Address : ValueObject
{
    public string FirstName { get; }
    public string LastName { get; }
    public string Email { get; }
    public string Line1 { get; }
    public string City { get; }
    public string PostalCode { get; }
    public string Country { get; }

    private Address()
    {
        FirstName = string.Empty;
        LastName = string.Empty;
        Email = string.Empty;
        Line1 = string.Empty;
        City = string.Empty;
        PostalCode = string.Empty;
        Country = string.Empty;
    }

    public Address(string firstName, string lastName, string email, string line1, string city, string postalCode, string country)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Line1 = line1;
        City = city;
        PostalCode = postalCode;
        Country = country;
    }

    protected override IEnumerable<object?> GetEqualityComponents()
    {
        yield return FirstName;
        yield return LastName;
        yield return Email;
        yield return Line1;
        yield return City;
        yield return PostalCode;
        yield return Country;
    }
}
