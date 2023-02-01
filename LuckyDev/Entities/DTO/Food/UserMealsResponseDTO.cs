using System.Collections.Generic;
using RecipeWiki.Entities.DTO.Food;

namespace RecipeWiki.Entities.DTO;

public class UserMealsResponseDTO
{
    /// <summary>
    /// List of meal ids from the MealDB
    /// </summary>
    /// <example>["532","42","423"]</example>
    public List<string> SavedMealsIds { get; set; }

    /// <summary>
    /// Custom meals
    /// </summary>
    public List<CustomMealResponseDTO> UserMeals { get; set; }
}