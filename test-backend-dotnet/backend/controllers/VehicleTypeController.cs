using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace backend.controllers
{
    [Route("api/vehicle-types")]
    [ApiController]
    public class VehicleTypeController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public VehicleTypeController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetALL()
        {
            var types = _context.vehicle_type.ToList();
            return Ok(types);
        }

        [HttpGet("{id}")]
        public IActionResult GetByID([FromRoute] int id)
        {
            var type = _context.vehicle_type.Find(id);

            if (type == null)
            {
                return NotFound();
            }

            return Ok(type);
        }
    }
}
