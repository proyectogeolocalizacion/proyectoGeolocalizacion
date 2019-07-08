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
            var device = await _context.Device.Where(x => x.Alias == alias).FirstOrDefaultAsync();
            device.Status = "Online";
           
            _context.Update(device);
            await _context.SaveChangesAsync();
            var devices = await _context.Device.Where(x => x.Status == "Online").ToListAsync();
            ViewData["alias"] = alias;
            return View(devices);
        }

        public async Task<IActionResult> DeviceOff(string alias, string canal)
        {
            var device = await _context.Device.Where(x => x.Alias == alias).FirstOrDefaultAsync();
            device.Status = "Offline";
            _context.Update(device);
            await _context.SaveChangesAsync();
            var devices = await _context.Device.Where(x => x.Status == "Online").ToListAsync();
            return View(devices);
        }
    }
}
