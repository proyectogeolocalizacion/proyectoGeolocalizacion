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
    public class HeatMapController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HeatMapController(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index(string alias, string canal)
        {

            ViewData["alias"] = alias;
            ViewData["canal"] = canal;
            if (alias != null)
            {
                var device = await _context.Device.Where(x => x.Alias == alias).FirstOrDefaultAsync();
                var channel = await _context.Channel.Where(x => x.Name == canal).FirstOrDefaultAsync();


                List<Location> locations = await _context.Location.Where(x => x.DeviceId == device.Id).ToListAsync();
                return View(locations);

            }
            var allLocations = await _context.Location.ToListAsync();
            return View(allLocations);
        }
    }
}