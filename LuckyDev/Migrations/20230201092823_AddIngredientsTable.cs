using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeWiki.Migrations
{
    /// <inheritdoc />
    public partial class AddIngredientsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredient_CustomMeal_CustomMealId",
                table: "Ingredient");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingredient_Users_UserId",
                table: "Ingredient");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingredient",
                table: "Ingredient");

            migrationBuilder.RenameTable(
                name: "Ingredient",
                newName: "Ingredients");

            migrationBuilder.RenameIndex(
                name: "IX_Ingredient_UserId",
                table: "Ingredients",
                newName: "IX_Ingredients_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Ingredient_CustomMealId",
                table: "Ingredients",
                newName: "IX_Ingredients_CustomMealId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingredients",
                table: "Ingredients",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_CustomMeal_CustomMealId",
                table: "Ingredients",
                column: "CustomMealId",
                principalTable: "CustomMeal",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_Users_UserId",
                table: "Ingredients",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_CustomMeal_CustomMealId",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Users_UserId",
                table: "Ingredients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingredients",
                table: "Ingredients");

            migrationBuilder.RenameTable(
                name: "Ingredients",
                newName: "Ingredient");

            migrationBuilder.RenameIndex(
                name: "IX_Ingredients_UserId",
                table: "Ingredient",
                newName: "IX_Ingredient_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Ingredients_CustomMealId",
                table: "Ingredient",
                newName: "IX_Ingredient_CustomMealId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingredient",
                table: "Ingredient",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredient_CustomMeal_CustomMealId",
                table: "Ingredient",
                column: "CustomMealId",
                principalTable: "CustomMeal",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredient_Users_UserId",
                table: "Ingredient",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
