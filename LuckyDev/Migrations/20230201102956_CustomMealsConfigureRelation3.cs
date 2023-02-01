using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeWiki.Migrations
{
    /// <inheritdoc />
    public partial class CustomMealsConfigureRelation3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_CustomMeals_CustomMealId",
                table: "Ingredients");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_CustomMeals_CustomMealId",
                table: "Ingredients",
                column: "CustomMealId",
                principalTable: "CustomMeals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_CustomMeals_CustomMealId",
                table: "Ingredients");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_CustomMeals_CustomMealId",
                table: "Ingredients",
                column: "CustomMealId",
                principalTable: "CustomMeals",
                principalColumn: "Id");
        }
    }
}
