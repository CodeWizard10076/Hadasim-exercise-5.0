using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroceryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IService<Product> service;
        public ProductController(IService<Product> service)
        {
            this.service = service;
        }
        // GET: api/<ProductController>
        [HttpGet]
        public async Task<List<Product>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<Product> Get(int id)
        {
            return await service.Get(id);
        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<Product> Post([FromBody] Product item)
        {
            return await service.Add(item);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public async Task<Product> Put(int id, [FromBody] Product item)
        {
            return await service.Update(id, item);
        }
    }
}
