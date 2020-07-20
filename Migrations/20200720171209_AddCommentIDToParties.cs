using Microsoft.EntityFrameworkCore.Migrations;

namespace Tailgate.Migrations
{
    public partial class AddCommentIDToParties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Comments_PartyId",
                table: "Comments",
                column: "PartyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Parties_PartyId",
                table: "Comments",
                column: "PartyId",
                principalTable: "Parties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Parties_PartyId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_PartyId",
                table: "Comments");
        }
    }
}
