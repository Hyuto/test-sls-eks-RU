using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.models
{
    public class VehicleBrand
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; } = string.Empty;
        public DateTime createdAt { get; set; } = DateTime.Now;
        public DateTime updatedAt { get; set; } = DateTime.Now;

        public List<VehicleType> Types { get; set; } = new List<VehicleType>();
    }
}