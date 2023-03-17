using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace crud_emp.Models
{
    public class Cars
    {
        public int? Id { get; set; }
        public int? foreignKey { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public DateTime? Year { get; set; }
        public string? Price { get; set; }

        //[DisplayFormat(DataFormatString = "{0:dd MMM yyyy}")]
        //[DataType(DataType.Date)]
        public bool? New { get; set; }
        public string? FileName { get; set; }
        [NotMapped]
        public IFormFile? FormFile { get; set; }

    }
}
