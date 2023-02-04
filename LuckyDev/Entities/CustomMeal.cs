using System.Collections.Generic;

namespace RecipeWiki.Entities;

public class CustomMeal
{
    /// <summary>
    /// Internal Id
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }

    public required User User { get; set; }

    /// <example>Cake</example>
    public required string Name { get; set; }

    public required string Area { get; set; }

    public required string Category { get; set; }
    public List<Ingredient> Ingredients { get; set; } = new();

    /// <example>Add eggs, flour and water...</example>
    public string Instructions { get; set; } = string.Empty;
}