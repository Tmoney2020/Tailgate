using Microsoft.EntityFrameworkCore.Migrations;

namespace Tailgate.Migrations
{
    public partial class StartAndEndTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "Parties");

            migrationBuilder.AddColumn<string>(
                name: "EndTime",
                table: "Parties",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StartTime",
                table: "Parties",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Parties");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Parties");

            migrationBuilder.AddColumn<string>(
                name: "Time",
                table: "Parties",
                type: "text",
                nullable: true);
        }
    }
}
