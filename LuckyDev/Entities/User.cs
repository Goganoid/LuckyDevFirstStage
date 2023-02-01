using System.Collections.Generic;
using RecipeWiki.Helpers;

namespace RecipeWiki.Entities;

public class User
{
    public User()
    {
    }

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
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }

    public List<Ingredient> StoredIngredients { get; set; } = new();
    public List<string> SavedMealsIds { get; set; } = new();

    public List<CustomMeal> UserMeals { get; set; } = new();
}