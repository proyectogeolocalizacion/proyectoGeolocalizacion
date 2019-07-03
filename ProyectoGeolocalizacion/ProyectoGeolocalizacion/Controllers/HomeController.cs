using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProyectoGeolocalizacion.Models;
using ProyectoGeolocalizacion.Data;
using Microsoft.EntityFrameworkCore;

namespace ProyectoGeolocalizacion.Controllers
{
    public class HomeController : Controller

    {

        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<IActionResult> Index(string alias)
        {
            ViewData["Viewdata"] = false;

            if (alias != null)
            {
                ViewData["Viewdata"] =await AliasExistsAsync(alias);
                ViewData["alias"] = alias;
                return View();

            }
            else
            {
                return View();

            }




        }

        //COMPROBAR ALIAS
        public async Task<bool> AliasExistsAsync(string alias)
        {
            var device = await _context.Device.FirstOrDefaultAsync(m => m.Alias == alias);

            if (device == null)
            {

                Device newDevice = new Device
                {
                    Alias = alias
                };
                _context.Add(newDevice);
                await _context.SaveChangesAsync();
                return false;

            }
            else
            {

                return true;
            }
        }
      

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
