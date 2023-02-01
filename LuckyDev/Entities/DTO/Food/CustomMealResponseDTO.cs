using System.Collections.Generic;

namespace RecipeWiki.Entities.DTO.Food;

public class CustomMealResponseDTO
{
    /// <summary>
    /// Meal id in our database
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }

    /// <example>Cake</example>
    public string Name { get; set; }

    public List<IngredientDTO> Ingredients { get; set; }

    /// <example>Add eggs, flour and water...</example>
    public string Instructions { get; set; }
}