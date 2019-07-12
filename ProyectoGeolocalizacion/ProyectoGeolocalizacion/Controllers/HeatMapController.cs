using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoGeolocalizacion.Data;

namespace ProyectoGeolocalizacion.Controllers
{
    public class HeatMapController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HeatMapController(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> IndexAsync(string alias, string canal)
        {

            ViewData["alias"] = alias;
            ViewData["canal"] = canal;

            if (alias != null)
            {
                var device = await _context.Device.Where(x => x.Alias == alias).FirstOrDefaultAsync();
                var locations = device.Locations.ToList();
                var allLocations = await _context.Device.Include(x=>x.Locations).ToListAsync();
            }
            return View();
        }
    }
}