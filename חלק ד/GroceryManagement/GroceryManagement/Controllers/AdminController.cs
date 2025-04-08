using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroceryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] string password)
        {
            // כניסה קבועה למנהל
            if (password == "MySecurePassword123")
            {
                return Ok("Admin login success");
            }

            return Unauthorized("Invalid credentials");
        }
    }
}
