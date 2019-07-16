using Microsoft.EntityFrameworkCore.Migrations;

namespace ProyectoGeolocalizacion.Migrations
{
    public partial class modeldevice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
