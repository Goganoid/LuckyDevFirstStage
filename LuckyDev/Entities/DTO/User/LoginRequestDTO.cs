using System.ComponentModel.DataAnnotations;

namespace RecipeWiki.Entities.DTO.User;

public class LoginRequestDTO
{
    /// <example>john_doe@gmail.com</example> 
    [Required]
    public string Email { get; set; }

    /// <example>123456</example> 
    [Required]
    public string Password { get; set; }
}