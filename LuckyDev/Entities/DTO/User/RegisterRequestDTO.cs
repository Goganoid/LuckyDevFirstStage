using System.ComponentModel.DataAnnotations;

namespace RecipeWiki.Entities.DTO.User;

public class RegisterRequestDTO
{
    /// <example>John</example> 
    [Required]
    public string FirstName { get; set; }

    /// <example>Doe</example> 
    [Required]
    public string LastName { get; set; }

    /// <example>john_doe@gmail.com</example> 
    [Required]
    public string Email { get; set; }

    /// <example>123456</example> 
    [Required]
    public string Password { get; set; }
}