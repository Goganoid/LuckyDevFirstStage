using System.Collections.Generic;

namespace RecipeWiki.Entities.DTO;

public class MealModel
{
    public string Name { get; set; }
    public List<IngredientModel> Ingredients { get; set; }
    public string Instructions { get; set; }
}