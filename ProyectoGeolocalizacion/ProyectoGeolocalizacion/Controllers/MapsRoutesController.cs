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
    public class MapsRoutesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MapsRoutesController(ApplicationDbContext context)
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


            var devices = await _context.Device.Where(x => x.Channel == canal).ToListAsync();
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
            return RedirectToAction("Index", "MapsRoutes", devices);
        }
    }
}

//public async Task<IActionResult> ShowRoute(string alias, string canal)
//{
//    ViewData["alias"] = alias;
//    ViewData["canal"] = canal;

//    if (alias != null)
//    {
//        var device = await _context.Device.Where(x => x.Alias == alias).FirstOrDefaultAsync();
//        var channel = await _context.Channel.Where(x => x.Name == canal).FirstOrDefaultAsync();


//        List<Location> locations = await _context.Location.Where(x => x.DeviceId == device.Id).ToListAsync();
//        return View(locations);

//    }
//    var allLocations = await _context.Location.ToListAsync();
//    return View(allLocations);





//}










