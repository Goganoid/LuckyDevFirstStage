namespace RecipeWiki.Entities.DTO.User;

public class RegisterRequestDTO
{
    /// <example>John</example> 
    public required string FirstName { get; set; }

    /// <example>Doe</example> 
    public required string LastName { get; set; }

    /// <example>john_doe@gmail.com</example> 
    public required string Email { get; set; }

    /// <example>123456</example> 
    public required string Password { get; set; }
}