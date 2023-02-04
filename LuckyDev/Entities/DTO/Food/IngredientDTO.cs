namespace RecipeWiki.Entities.DTO;

public class IngredientDTO
{
    /// <example>Steak</example>
    public required string Name { get; set; }

    /// <example>450g</example>
    public string? Measure { get; set; }
}