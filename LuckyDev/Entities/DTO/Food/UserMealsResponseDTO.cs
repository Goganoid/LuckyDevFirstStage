using System.Collections.Generic;

namespace RecipeWiki.Entities.DTO.Food;

public class UserMealsResponseDTO
{
    /// <summary>
    /// List of meal ids from the MealDB
    /// </summary>
    /// <example>["532","42","423"]</example>
    public List<string> SavedMealsIds { get; set; } = new();

    /// <summary>
    /// Custom meals
    /// </summary>
    public List<CustomMealResponseDTO> UserMeals { get; set; } = new();
}