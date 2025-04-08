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
    public class ProductRepository :IRepository<Product>
    {
        public readonly IContext _context;
        public ProductRepository(IContext _context)
        {
            this._context = _context;
        }
        public async Task<Product> Add(Product item)
        {
            await _context.Product.AddAsync(item);
            await _context.Save();
            return item;
        }

        public async Task<Product> Get(int id)
        {
            return await _context.Product.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Product>> GetAll()
        {
            return await _context.Product.ToListAsync();
        }

        public async Task<Product> Update(int id, Product item)
        {
            var Product = await Get(id);
            Product.ProductName = item.ProductName;
            Product.Price = item.Price;
            Product.MinimumAmount = item.MinimumAmount;
            await _context.Save();
            return Product;
        }
    }
}
