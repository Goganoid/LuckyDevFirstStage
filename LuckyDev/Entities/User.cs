using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using RecipeWiki.Helpers;

namespace RecipeWiki.Entities;

public class User
{
    public User()
    {
    }

    [SetsRequiredMembers]
    public User(string firstName, string lastName, string email,
        string password)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        PasswordUtils.CreatePasswordHash(password, out var passwordHash, out var passwordSalt);
        PasswordHash = passwordHash;
        PasswordSalt = passwordSalt;
    }

    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }

    public List<Ingredient> StoredIngredients { get; set; } = new();
    public List<string> SavedMealsIds { get; set; } = new();

    public List<CustomMeal> UserMeals { get; set; } = new();
}