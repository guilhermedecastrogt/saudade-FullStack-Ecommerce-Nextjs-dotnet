namespace Identity.Domain;

public sealed class Role
{
    public string Name { get; private set; } = string.Empty;

    private Role()
    {
    }

    public Role(string name)
    {
        Name = name;
    }
}
