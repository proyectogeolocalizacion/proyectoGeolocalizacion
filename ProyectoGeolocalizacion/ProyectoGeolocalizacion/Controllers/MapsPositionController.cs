using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ProyectoGeolocalizacion.Controllers
{
    public class MapsPositionController : Controller
    {
        public IActionResult Index(string alias, string canal)
        {
            ViewData["alias"] = alias;
            ViewData["channel"] = canal;
            return View();
        }
    }
}
