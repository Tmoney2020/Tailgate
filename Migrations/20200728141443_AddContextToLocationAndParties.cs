using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

namespace Tailgate.Migrations
{
    public partial class AddContextToLocationAndParties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Parties");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Parties");

            migrationBuilder.AddColumn<Point>(
                name: "Location",
                table: "Parties",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Parties");

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Parties",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Parties",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
