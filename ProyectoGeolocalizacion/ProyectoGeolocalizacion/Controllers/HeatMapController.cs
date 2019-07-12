using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ProyectoGeolocalizacion.Controllers
{
    public class HeatMapController : Controller
    {
        public IActionResult Index(string alias, string canal)
        {

            ViewData["alias"] = alias;
            ViewData["canal"] = canal;
            return View();
        }
    }
}