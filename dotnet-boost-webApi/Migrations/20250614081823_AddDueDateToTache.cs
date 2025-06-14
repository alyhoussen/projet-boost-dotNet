using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnet_webApi.Migrations
{
    /// <inheritdoc />
    public partial class AddDueDateToTache : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DueDate",
                table: "Taches",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Taches");
        }
    }
}
