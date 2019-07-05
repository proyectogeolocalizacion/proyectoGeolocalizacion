using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProyectoGeolocalizacion.Models;

namespace ProyectoGeolocalizacion.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ProyectoGeolocalizacion.Models.Device> Device { get; set; }
        public DbSet<ProyectoGeolocalizacion.Models.Location> Location { get; set; }
        public DbSet<ProyectoGeolocalizacion.Models.Channel> Channel { get; set; }

    }
}
