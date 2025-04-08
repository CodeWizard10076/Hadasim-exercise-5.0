using Microsoft.EntityFrameworkCore;
using Repository.Interface;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class OrderRepository : IRepository<Order>
    {
        public readonly IContext _context;
        public OrderRepository(IContext _context)
        {
            this._context = _context;
        }
        public async Task<Order> Add(Order item)
        {
            await _context.Order.AddAsync(item);
            await _context.Save();
            return item;
        }

        public async Task<Order> Get(int id)
        {
            return await _context.Order.Include(s => s.OrderProducts).Include(s => s.Supplier).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Order>> GetAll()
        {
            return await _context.Order.Include(s => s.OrderProducts).Include(s=>s.Supplier).ToListAsync();
        }

        public async Task<Order> Update(int id, Order item)
        {
            var order = await Get(id);
            order.SupplierId = item.SupplierId;
            order.Date = item.Date;
            order.Status = item.Status;
            order.OrderProducts = item.OrderProducts;
            await _context.Save();
            return order;
        }
    }
}
