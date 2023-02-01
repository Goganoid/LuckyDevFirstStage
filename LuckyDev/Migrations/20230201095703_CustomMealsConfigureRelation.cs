using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeWiki.Migrations
{
    /// <inheritdoc />
    public partial class CustomMealsConfigureRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomMeals_Users_UserId",
                table: "CustomMeals");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "CustomMeals",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomMeals_Users_UserId",
                table: "CustomMeals",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomMeals_Users_UserId",
                table: "CustomMeals");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "CustomMeals",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomMeals_Users_UserId",
                table: "CustomMeals",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
