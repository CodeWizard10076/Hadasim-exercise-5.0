using Service.Interfaces;
using Repository.Entities;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class OrderService : IService<Order>
    {
        private readonly IRepository<Order> _repository;
        public OrderService(IRepository<Order> _repository)
        {
            this._repository = _repository;
        }

        public Task<Order> Add(Order item)
        {
            return _repository.Add(item);
        }

        public Task<Order> Get(int id)
        {
            return _repository.Get(id);
        }

        public Task<List<Order>> GetAll()
        {
            return _repository.GetAll();
        }

        public Task<Order> Update(int id, Order item)
        {
            return _repository.Update(id, item);
        }

        public async Task<List<Order>> GetBySupplier(int id)
        {
            var orders = await _repository.GetAll();
            return orders.Where(d => d.SupplierId == id).ToList();
        }
    }
}
