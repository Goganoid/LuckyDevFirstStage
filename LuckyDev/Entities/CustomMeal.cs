using System.Collections.Generic;

namespace RecipeWiki.Entities;

public class CustomMeal
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Ingredient> Ingredients { get; set; }
    public string Instructions { get; set; }
}