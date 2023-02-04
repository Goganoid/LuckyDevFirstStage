namespace RecipeWiki.Entities;

public class Ingredient
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Measure { get; set; }
}