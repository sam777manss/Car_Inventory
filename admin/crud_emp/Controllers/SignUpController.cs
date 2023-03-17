using crud_emp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace crud_emp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : Controller
    {
        private readonly CarsContext _carsContext;

        public SignUpController(CarsContext employeeContext)
        {
            _carsContext = employeeContext;
        }

        [HttpPost]
        [Route("GetlogedUser")]
        public ActionResult<SignUp> GetLogedUser([FromForm] Login log)
        {
            try
            {
                //bool emailExists = _carsContext._signUps.Any(u => u.Email == log.Email);
                var userTableData  = _carsContext._signUps.Where(x => x.Email == log.Email).FirstOrDefault();
                return userTableData;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<ActionResult<Cars>> GetById(int id)
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
        [HttpPost]
        [Route("AddSignUp")]
        public async Task<ActionResult<string>> PostEmployee([FromForm] SignUp obj)
        {
            bool emailExists = _carsContext._signUps.Any(u => u.Email == obj.Email);
            if(!emailExists)
            {
                try
                {
                    _carsContext._signUps.Add(obj);
                    await _carsContext.SaveChangesAsync();
                    var isIn = CreatedAtAction(nameof(GetById), new { id = obj.Id }, obj);
                    if (isIn.StatusCode == 201)
                    {
                        return "successfull inserted";
                    }
                    else
                    {
                        return "something went wrong";
                    }
                    //return CreatedAtAction(nameof(GetById), new { id = obj.Id }, obj);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else
            {
                return "Email Exists";
            }
        }
    }
}
