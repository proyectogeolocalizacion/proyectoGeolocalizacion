using Microsoft.EntityFrameworkCore.Migrations;

namespace ProyectoGeolocalizacion.Migrations
{
    public partial class migra2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Device_Channel_ChannelId",
                table: "Device");

            migrationBuilder.DropIndex(
                name: "IX_Device_ChannelId",
                table: "Device");

            migrationBuilder.DropColumn(
                name: "ChannelId",
                table: "Device");

            migrationBuilder.AddColumn<string>(
                name: "Channel",
                table: "Device",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Channel",
                table: "Device");

            migrationBuilder.AddColumn<int>(
                name: "ChannelId",
                table: "Device",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Device_ChannelId",
                table: "Device",
                column: "ChannelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Device_Channel_ChannelId",
                table: "Device",
                column: "ChannelId",
                principalTable: "Channel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
