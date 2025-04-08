using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Repository.Entities;
using Service.Interfaces;
using Service.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroceryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly IService<Supplier> service;
        private readonly IConfiguration _configuration;
        private readonly SupplierService _service;
        public SupplierController(IService<Supplier> service , IConfiguration configuration , SupplierService _service)
        {
            this.service = service;
            _configuration = configuration;
            this._service = _service;
        }
        // GET: api/<SupplierController>
        [HttpGet]
        public async Task<List<Supplier>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<SupplierController>/5
        [HttpGet("{id}")]
        public async Task<Supplier> Get(int id)
        {
            return await service.Get(id);
        }
        // DTO למוצר
        public class ProductDTO
        {
            public string ProductName { get; set; }
            public double Price { get; set; }
            public int MinimumAmount { get; set; }
        }

        // DTO לספק עם מוצרים
        public class SupplierWithProductsDTO
        {
            public string SupplierName { get; set; }
            public string PhoneNumber { get; set; }
            public string CompanyName { get; set; }
            public string Password { get; set; }
            public List<ProductDTO> Products { get; set; }
        }
        // POST api/<SupplierController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SupplierWithProductsDTO dto)
        {
            var supplier = new Supplier
            {
                SupplierName = dto.SupplierName,
                PhoneNumber = dto.PhoneNumber,
                CompanyName = dto.CompanyName,
                Password = dto.Password,
                Products = dto.Products.Select(p => new Product
                {
                    ProductName = p.ProductName,
                    Price = p.Price,
                    MinimumAmount = p.MinimumAmount
                }).ToList()
            };

            // קישור הספק למוצרים (כדי למנוע בעיות ב־EF)
            foreach (var product in supplier.Products)
            {
                product.Supplier = supplier;
            }

            var addedSupplier = await service.Add(supplier);
            if (addedSupplier == null)
            {
                return BadRequest("Failed to create supplier");
            }

            var token = Generate(addedSupplier);
            return Ok(token);
        }


        // PUT api/<SupplierController>/5
        [HttpPut("{id}")]
        public async Task<Supplier> Put(int id, [FromBody] Supplier item)
        {
            return await service.Update(id, item);
        }

        private string Generate(Supplier supplier)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,supplier.SupplierName),
                new Claim("id", supplier.Id.ToString())            };
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.Now.AddMinutes(15), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public class LoginRequest
        {
            public string Phone { get; set; }
            public string Password { get; set; }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            Supplier supplier = await _service.Login(request.Phone, request.Password);
            if (supplier == null)
            {
                return Unauthorized();
            }
            var token = Generate(supplier);
            return Ok(token);
        }
    }
}
