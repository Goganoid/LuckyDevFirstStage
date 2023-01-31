using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeWiki.Migrations
{
    /// <inheritdoc />
    public partial class UserIngridientQuantityToMeasure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Ingredient");

            migrationBuilder.AddColumn<string>(
                name: "Measure",
                table: "Ingredient",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Measure",
                table: "Ingredient");

            migrationBuilder.AddColumn<uint>(
                name: "Quantity",
                table: "Ingredient",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0u);
        }
    }
}
