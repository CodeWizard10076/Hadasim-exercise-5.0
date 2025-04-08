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
    public class ProductService : IService<Product>
    {
        private readonly IRepository<Product> _repository;
        public ProductService(IRepository<Product> _repository)
        {
            this._repository = _repository;
        }

        public Task<Product> Add(Product item)
        {
            return _repository.Add(item);
        }

        public Task<Product> Get(int id)
        {
            return _repository.Get(id);
        }

        public Task<List<Product>> GetAll()
        {
            return _repository.GetAll();
        }

        public Task<Product> Update(int id, Product item)
        {
            return _repository.Update(id, item);
        }
    }
}
