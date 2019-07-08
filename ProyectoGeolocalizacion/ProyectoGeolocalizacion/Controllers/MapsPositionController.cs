using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoGeolocalizacion.Data;

namespace ProyectoGeolocalizacion.Controllers
{
    public class MapsPositionController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MapsPositionController(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index(string alias, string canal)
        {
            var devices = await _context.Device.ToListAsync();
            return View(devices);
        }
    }
}
