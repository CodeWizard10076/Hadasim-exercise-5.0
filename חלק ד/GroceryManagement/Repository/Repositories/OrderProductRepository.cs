using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class OrderProductRepository :IRepository<OrderProduct>
    {
        public readonly IContext _context;
        public OrderProductRepository(IContext _context)
        {
            this._context = _context;
        }
        public async Task<OrderProduct> Add(OrderProduct item)
        {
            await _context.OrderProduct.AddAsync(item);
            await _context.Save();
            return item;
        }

        public async Task<OrderProduct> Get(int id)
        {
            return await _context.OrderProduct.Include(o=>o.Product).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<OrderProduct>> GetAll()
        {
            return await _context.OrderProduct.Include(o => o.Product).ToListAsync();
        }

        public async Task<OrderProduct> Update(int id, OrderProduct item)
        {
            var OrderProduct = await Get(id);
            OrderProduct.ProductId = item.ProductId;
            OrderProduct.Quantity = item.Quantity;
            await _context.Save();
            return OrderProduct;
        }
    }
}
