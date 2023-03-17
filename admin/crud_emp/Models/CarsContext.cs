using Microsoft.EntityFrameworkCore;

namespace crud_emp.Models
{
    public class CarsContext: DbContext
    {
        public CarsContext(DbContextOptions<CarsContext> options): base(options)
        {

        }

        public DbSet<Cars> _cars { get; set; } = null!;

        public DbSet<SignUp> _signUps { get; set; } = null!;

    }

}
