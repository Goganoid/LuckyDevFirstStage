using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeWiki.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomMealsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomMeal_Users_UserId",
                table: "CustomMeal");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_CustomMeal_CustomMealId",
                table: "Ingredients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomMeal",
                table: "CustomMeal");

            migrationBuilder.RenameTable(
                name: "CustomMeal",
                newName: "CustomMeals");

            migrationBuilder.RenameIndex(
                name: "IX_CustomMeal_UserId",
                table: "CustomMeals",
                newName: "IX_CustomMeals_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomMeals",
                table: "CustomMeals",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomMeals_Users_UserId",
                table: "CustomMeals",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_CustomMeals_CustomMealId",
                table: "Ingredients",
                column: "CustomMealId",
                principalTable: "CustomMeals",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomMeals_Users_UserId",
                table: "CustomMeals");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_CustomMeals_CustomMealId",
                table: "Ingredients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomMeals",
                table: "CustomMeals");

            migrationBuilder.RenameTable(
                name: "CustomMeals",
                newName: "CustomMeal");

            migrationBuilder.RenameIndex(
                name: "IX_CustomMeals_UserId",
                table: "CustomMeal",
                newName: "IX_CustomMeal_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomMeal",
                table: "CustomMeal",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomMeal_Users_UserId",
                table: "CustomMeal",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_CustomMeal_CustomMealId",
                table: "Ingredients",
                column: "CustomMealId",
                principalTable: "CustomMeal",
                principalColumn: "Id");
        }
    }
}
