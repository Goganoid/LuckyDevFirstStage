using System.Collections.Generic;

namespace RecipeWiki.Entities;

public class CustomMeal
{
    /// <summary>
    /// Internal Id
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }

    public User User { get; set; }

    /// <example>Cake</example>
    public string Name { get; set; }

    public List<Ingredient> Ingredients { get; set; }

    /// <example>Add eggs, flour and water...</example>
    public string Instructions { get; set; }
}