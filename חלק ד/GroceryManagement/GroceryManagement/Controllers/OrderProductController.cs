using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroceryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductController : ControllerBase
    {
        private readonly IService<OrderProduct> service;
        public OrderProductController(IService<OrderProduct> service)
        {
            this.service = service;
        }
        // GET: api/<OrderProductController>
        [HttpGet]
        public async Task<List<OrderProduct>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<OrderProductController>/5
        [HttpGet("{id}")]
        public async Task<OrderProduct> Get(int id)
        {
            return await service.Get(id);
        }

        // POST api/<OrderProductController>
        [HttpPost]
        public async Task<OrderProduct> Post([FromBody] OrderProduct item)
        {
            return await service.Add(item);
        }

        // PUT api/<OrderProductController>/5
        [HttpPut("{id}")]
        public async Task<OrderProduct> Put(int id, [FromBody] OrderProduct item)
        {
            return await service.Update(id, item);
        }
    }
}
