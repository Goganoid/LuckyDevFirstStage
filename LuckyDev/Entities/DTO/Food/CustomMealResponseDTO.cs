using System.Collections.Generic;

namespace RecipeWiki.Entities.DTO.Food;

public class CustomMealResponseDTO
{
    /// <summary>
    /// Meal id in our database
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }
    
    public required string Image { get; set; }
    /// <example>Cake</example>
    public required string Name { get; set; }

    public required string Area { get; set; }

    public required string Category { get; set; }
    
    public List<IngredientDTO> Ingredients { get; set; } = new();

    /// <example>Add eggs, flour and water...</example>
    public required string Instructions { get; set; }
}