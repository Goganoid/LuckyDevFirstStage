using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeWiki.Migrations.SqlServer
{
    /// <inheritdoc />
    public partial class UpdateCustomMeal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Area",
                table: "CustomMeals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "CustomMeals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Area",
                table: "CustomMeals");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "CustomMeals");
        }
    }
}
