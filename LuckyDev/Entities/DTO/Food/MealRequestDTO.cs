using System.Collections.Generic;

namespace RecipeWiki.Entities.DTO;

public class MealRequestDTO
{
    /// <example>Cake</example>
    public required string Name { get; set; }
    public required string Image { get; set; }
    public List<IngredientDTO> Ingredients { get; set; } = new();
    public required string Area { get; set; }

    public required string Category { get; set; }

    /// <example>Add eggs, flour and water...</example>
    public required string Instructions { get; set; }
}