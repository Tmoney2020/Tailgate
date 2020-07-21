using Microsoft.EntityFrameworkCore.Migrations;

namespace Tailgate.Migrations
{
    public partial class AddUserIdToPartyAndComments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Parties",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Comments",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Parties");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Comments");
        }
    }
}
