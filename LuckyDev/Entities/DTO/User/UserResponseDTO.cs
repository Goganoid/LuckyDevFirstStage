namespace RecipeWiki.Entities.DTO.User;

public class UserResponseDTO
{
    /// <example>1</example>
    public int Id { get; set; }

    /// <example>John</example>
    public string FirstName { get; set; }

    /// <example>Doe</example>
    public string LastName { get; set; }

    /// <example>email@gmail.com</example>
    public string Email { get; set; }
}