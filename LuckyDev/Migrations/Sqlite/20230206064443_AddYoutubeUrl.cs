using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeWiki.Migrations.Sqlite
{
    /// <inheritdoc />
    public partial class AddYoutubeUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "YoutubeUrl",
                table: "CustomMeals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "YoutubeUrl",
                table: "CustomMeals");
        }
    }
}
