#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace RecipeWiki.Migrations.Sqlite
{
    /// <inheritdoc />
    public partial class AddNameToIngredient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IngredientInfoId",
                table: "Ingredients",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Ingredients",
                newName: "IngredientInfoId");
        }
    }
}