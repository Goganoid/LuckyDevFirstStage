using System.Collections.Generic;

namespace RecipeWiki.Entities.DTO;

public class UserRecipesDTO
{
    public List<string> SavedMealsIds { get; set; }

    public List<CustomMeal> UserMeals { get; set; }
}