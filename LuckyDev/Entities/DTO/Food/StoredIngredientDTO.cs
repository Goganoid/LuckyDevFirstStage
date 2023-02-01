namespace RecipeWiki.Entities.DTO.User;

public class StoredIngredientDTO
{
    /// <summary>
    /// idIngredient from the MealDB 
    /// </summary>
    /// <example>1</example>
    public required string IngredientInfoId { get; set; }
}