using crud_emp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;

namespace crud_emp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly CarsContext _carsContext;

        public CarsController(CarsContext carsContext)
        {
            _carsContext = carsContext;
        }
        //Get: api/Cars
        //[HttpGet]
        //[Route("SearchCarsByBrandAndModel/{user_input}")]
        //public async Task<ActionResult<IEnumerable<Cars>>> SearchCarsByBrandAndModel(string? user_input)
        //{

        //    if (_carsContext._cars == null)
        //    {
        //        return NotFound();
        //    }
        //    var result = _carsContext._cars.Where(x => x.Model.Contains(user_input) || x.Brand.Contains(user_input)).ToList();
        //    return result;
        //    //return await _carsContext._cars.ToListAsync();
        //}
        //Get: api/Cars
        [HttpGet]
        [Route("GetCars/{id}")]
        public async Task<ActionResult<IEnumerable<Cars>>> GetCars(int id)
        {
            var userTableData = _carsContext._signUps.Where(x => x.Id == id);

            //var result = from userData in userTableData
            //             join additionalData in _carsContext._cars
            //             on userData.Id equals additionalData.Id
            //             select new { userData, additionalData };
            if (_carsContext._cars == null)
            {
                return NotFound();
            }
            if(userTableData == null)
            {
                return NotFound();
            }
            return await _carsContext._cars.Where(x => x.foreignKey == id).ToListAsync();
            //return await _carsContext._cars.ToListAsync();
        }
        // Get: api/Cars/5
        [HttpGet]
        [Route("GetCarById/{id}")]
        public async Task<ActionResult<Cars>> GetCar(int id)
        {
            if (_carsContext._cars == null)
            {
                return NotFound();
            }
            var emp = await _carsContext._cars.FindAsync(id);
            if (emp == null)
            {
                return NotFound();
            }
            return emp;
        }

        // Post: api/Cars
        [HttpPost]
        [Route("AddCar/{id}")]
        public async Task<ActionResult<Cars>> PostCar([FromForm] Cars emp, int id)
        {
            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", emp.FileName);

                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    emp.FormFile.CopyTo(stream);
                }

                //return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            DateTime date = DateTime.Now;
            var dateTimeNow = date.ToString("yyyy-MM-dd");
            emp.Year = date;
            emp.FileName = "/images/"+ emp.FileName;
            emp.foreignKey = id;
            _carsContext._cars.Add(emp);

            await _carsContext.SaveChangesAsync();

            // convert before returning

            return CreatedAtAction(nameof(GetCar), new { id = emp.Id }, emp);
        }

        // Put: api/Cars -> update record 

        [HttpPut]
        [Route("UpdateCar/{id}")]
        public async Task<ActionResult<IEnumerable<Cars>>> PutCar(int id, Cars emp)
        {
            if (id != emp.Id)
            {
                return BadRequest();
            }
            _carsContext.Entry(emp).State = EntityState.Modified;

            try
            {
                await _carsContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!CarExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            //return NoContent();
            return await _carsContext._cars.ToListAsync();

        }
        private bool CarExists(long id)
        {
            return (_carsContext._cars?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpPost]
        [Route("DeleteCar/{id}")]
        public async Task<ActionResult<IEnumerable<Cars>>> DeleteCar([FromForm] UserIdToDelete empobj, int id)
        {
            if (_carsContext._cars == null)
            {
                return NotFound();
            }
            var emp = await _carsContext._cars.Where(i => i.Id == id).FirstOrDefaultAsync();

            //var emp = await _cars._cars.FindAsync(id);
            if (emp == null)
            {
                return NotFound();
            }
            _carsContext._cars.Remove(emp);
            await _carsContext.SaveChangesAsync();

            //return NoContent();
            //return await _carsContext._cars.ToListAsync();
            return await _carsContext._cars.Where(x => x.foreignKey == id).ToListAsync();
        }
    }
}
