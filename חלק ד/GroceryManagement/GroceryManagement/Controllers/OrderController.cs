using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Service.Interfaces;
using Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroceryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IService<Order> service;
        private readonly OrderService _service;
        public OrderController(IService<Order> service, OrderService _service)
        {
            this.service = service;
            this._service = _service;
        }
        // GET: api/<OrderController>
        [HttpGet]
        public async Task<List<Order>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public async Task<Order> Get(int id)
        {
            return await service.Get(id);
        }
        // DTO למוצר בהזמנה
        public class OrderProductDTO
        {
            public int ProductId { get; set; }
            public virtual Product? Product { get; set; }
            public int Quantity { get; set; }
        }

        // DTO להזמנה
        public class OrderWithProductsDTO
        {
            public int SupplierId { get; set; }
            public virtual Supplier? Supplier { get; set; }
            public DateTime Date { get; set; }
            public string Status { get; set; }
            public List<OrderProductDTO> OrderProducts { get; set; }
        }

        // POST api/<OrderController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OrderWithProductsDTO dto)
        {
            var order = new Order
            {
                SupplierId = dto.SupplierId,
                Supplier = dto.Supplier,
                Date = dto.Date,
                Status = dto.Status,
                OrderProducts = dto.OrderProducts.Select(p => new OrderProduct
                {
                    ProductId = p.ProductId,
                    Product = p.Product,
                    Quantity = p.Quantity
                }).ToList()
            };

            // קישור הספק למוצרים (כדי למנוע בעיות ב־EF)
            foreach (var product in order.OrderProducts)
            {
                product.Order = order;
            }

            var addedOrder = await service.Add(order);
            if (addedOrder == null)
            {
                return BadRequest("Failed to create supplier");
            }

            return Ok(order);
        }


        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public async Task<Order> Put(int id, [FromBody] string status)
        {
            Order order = await service.Get(id);
            order.Status=status;
            return await service.Update(id, order);
        }

        [HttpGet("supplier/{id}")]
        public async Task<List<Order>> GetBySupplier(int id)
        {

            return await _service.GetBySupplier(id);
        }
    }
}
