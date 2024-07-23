using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<CUsers> c_users { get; set; }
        public DbSet<VehicleBrand> vehicle_brand { get; set; }
        public DbSet<VehicleType> vehicle_type { get; set; }
    }
}