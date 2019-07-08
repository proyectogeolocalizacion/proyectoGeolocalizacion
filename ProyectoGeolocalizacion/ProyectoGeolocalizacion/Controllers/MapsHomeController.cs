using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoGeolocalizacion.Data;
using ProyectoGeolocalizacion.Models;

namespace ProyectoGeolocalizacion.Controllers
{
    public class MapsHomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MapsHomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(string alias, string canal)
        {

            var device = await _context.Device.FirstOrDefaultAsync(x => x.Alias == alias);
            ViewData["alias"]=alias;
            ViewData["channel"] = canal;


            //navigator.geolocation.getCurrentPosition(function() {
            //    var latitude = position.coords.latitude;
            //    var longitude = position.coords.longitude;
            //});
            //var location = new Location()
            //{
            //    location.Longitude = longitude,
            //    location.Latitude = latitude
            //;

            //device.Locations.Add(location);


            return View();
            //return RedirectToAction("Index", "MapsPosition", new { device = device, canal = canal, location = location });
        }
    }
}