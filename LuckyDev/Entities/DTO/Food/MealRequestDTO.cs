using System.Collections.Generic;

namespace RecipeWiki.Entities.DTO;

public class MealRequestDTO
{
    /// <example>Cake</example>
    public string Name { get; set; }

    public List<IngredientDTO> Ingredients { get; set; }

    /// <example>Add eggs, flour and water...</example>
    public string Instructions { get; set; }
}