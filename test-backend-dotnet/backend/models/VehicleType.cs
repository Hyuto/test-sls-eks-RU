using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace backend.models
{
    public class VehicleType
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; } = string.Empty;
        public int brand_id { get; set; } // navigation
        [ForeignKey("brand_id")]
        public VehicleBrand? brand { get; set; }
        public DateTime createdAt { get; set; } = DateTime.Now;
        public DateTime updatedAt { get; set; } = DateTime.Now;
    }
}