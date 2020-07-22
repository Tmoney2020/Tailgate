using Microsoft.EntityFrameworkCore.Migrations;

namespace Tailgate.Migrations
{
    public partial class AddLatitudeAndLongitudeAndAddressToParty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Parties",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Parties",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Parties",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Parties");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Parties");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Parties");
        }
    }
}
