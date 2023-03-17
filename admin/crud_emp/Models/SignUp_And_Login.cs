namespace crud_emp.Models
{
    public class SignUp
    {
        public int? Id { get; set; } 

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

    }
    public class Login
    {
        public string Email { get; set; }

        public string Password { get; set; }

    }
    public class UserIdToDelete
    {
        public int userId { get; set; }
    }
}
