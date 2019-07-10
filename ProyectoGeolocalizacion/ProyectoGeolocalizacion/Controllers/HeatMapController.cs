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
        public async Task<IActionResult> Index(string alias, string canal)
        {
            if (alias != null)
            {
                var device = await _context.Device.Where(x => x.Alias == alias).FirstOrDefaultAsync();
                device.Status = "Online";
                device.Channel = canal;
                _context.Update(device);
                await _context.SaveChangesAsync();
            }


            var devices = await _context.Device.Where(x => x.Status == "Online").Where(x => x.Channel == canal).ToListAsync();
            ViewData["alias"] = alias;
            ViewData["canal"] = canal;
            return View(devices);
        }

        public async Task<IActionResult> DeviceOff(string alias, string canal)
        {
            if (alias != null)
            {
                var device = await _context.Device.Where(x => x.Alias == alias).Where(x => x.Channel == canal).FirstOrDefaultAsync();
                if (device.Status == "Online")
                {
                    device.Status = "Offline";
                    device.Channel = null;
                    _context.Update(device);
                    await _context.SaveChangesAsync();

                }
            }

            var devices = await _context.Device.Where(x => x.Status == "Online").Where(x => x.Channel == canal).ToListAsync();
            return RedirectToAction("Index", "Home");
        }
    }
}