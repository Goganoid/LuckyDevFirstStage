using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeWiki.Migrations
{
    /// <inheritdoc />
    public partial class UserAddStoredIngredients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Ingredient",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ingredient_UserId",
                table: "Ingredient",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredient_Users_UserId",
                table: "Ingredient",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredient_Users_UserId",
                table: "Ingredient");

            migrationBuilder.DropIndex(
                name: "IX_Ingredient_UserId",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Ingredient");
        }
    }
}
