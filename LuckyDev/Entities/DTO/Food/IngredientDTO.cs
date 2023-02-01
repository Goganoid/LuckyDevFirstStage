namespace RecipeWiki.Entities.DTO;

public class IngredientDTO
{
    /// <example>137</example>
    public required string IngredientInfoId { get; set; }

    /// <example>450g</example>
    public string? Measure { get; set; }
}