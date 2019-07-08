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


        public async Task<IActionResult> Index(string alias, string canal)
        {
            ViewData["aliasExists"] = false;
            ViewData["channelExists"] = false;
            bool aliasExists = false;
            bool channelExists = false;

            if (alias != null)
            {
                aliasExists = await AliasExistsAsync(alias);
                channelExists = await ChannelExistsAsync(canal, alias);
                ViewData["aliasExists"] = aliasExists;
                ViewData["channelExists"] =channelExists;
                ViewData["alias"] = alias;
                ViewData["channel"] = canal;

                if (aliasExists)
                {
                    return View();
                }

                return RedirectToAction("Index", "MapsHome", new { alias = alias , canal = canal });


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

        //COMPROBAR CANAL
        public async Task<bool> ChannelExistsAsync(string canal, string alias)
        {
            var channel = await _context.Channel.FirstOrDefaultAsync(m => m.Name == canal);
            var device = await _context.Device.FirstOrDefaultAsync(x => x.Alias == alias);
            if (channel == null)
            {

                Channel newChannel = new Channel
                {
                    Name = canal
                };
                _context.Add(newChannel);

                await _context.SaveChangesAsync();
                ChannelDevice channelDevice = new ChannelDevice
                {
                    Channel = newChannel,
                    Device = device
                };
                _context.Add(channelDevice);

                await _context.SaveChangesAsync();

                return false;

            }
            else
            {

                ChannelDevice cd = await _context.ChannelDevice.FirstOrDefaultAsync(x => x.ChannelId == channel.Id && x.DeviceId == device.Id);
                if (cd == null)
                {
                    ChannelDevice channelDevice = new ChannelDevice
                    {
                        Channel = channel,
                        Device = await _context.Device.FirstOrDefaultAsync(x => x.Alias == alias)
                    };
                    _context.Add(channelDevice);

                    await _context.SaveChangesAsync();

                }


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
