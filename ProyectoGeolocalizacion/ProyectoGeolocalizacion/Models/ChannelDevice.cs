using System;
namespace ProyectoGeolocalizacion.Models
{
    public class ChannelDevice
    {
        public int Id { get; set; }

        public int DeviceId { get; set; }
        public int ChannelId { get; set; }

        public Channel Channel { get; set; }
        public Device Device { get; set; }
    }
}
