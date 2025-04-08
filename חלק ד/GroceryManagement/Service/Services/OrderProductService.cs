using Repository.Entities;
using Repository.Interface;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class OrderProductService : IService<OrderProduct>
    {
        private readonly IRepository<OrderProduct> _repository;
        public OrderProductService(IRepository<OrderProduct> _repository)
        {
            this._repository = _repository;
        }

        public Task<OrderProduct> Add(OrderProduct item)
        {
            return _repository.Add(item);
        }

        public Task<OrderProduct> Get(int id)
        {
            return _repository.Get(id);
        }

        public Task<List<OrderProduct>> GetAll()
        {
            return _repository.GetAll();
        }

        public Task<OrderProduct> Update(int id, OrderProduct item)
        {
            return _repository.Update(id, item);
        }
    }
}
