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
    public class SupplierRepository : IRepository<Supplier>
    {
        public readonly IContext _context;
        public SupplierRepository(IContext _context)
        {
            this._context = _context;
        }
        public async Task<Supplier> Add(Supplier item)
        {
            await _context.Supplier.AddAsync(item);
            await _context.Save();
            return item;
        }

        public async Task<Supplier> Get(int id)
        {
            return await _context.Supplier.Include(s => s.Products).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Supplier>> GetAll()
        {
            return await _context.Supplier.Include(s => s.Products).ToListAsync();
        }

        public async Task<Supplier> Update(int id, Supplier item)
        {
            var Supplier = await Get(id);
            Supplier.CompanyName = item.CompanyName;
            Supplier.PhoneNumber = item.PhoneNumber;
            Supplier.SupplierName = item.SupplierName;
            Supplier.Products = item.Products;
            await _context.Save();
            return Supplier;
        }
    }
}
