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
    public class SupplierService : IService<Supplier>
    {
        private readonly IRepository<Supplier> _repository;
        public SupplierService(IRepository<Supplier> _repository)
        {
            this._repository = _repository;
        }

        public Task<Supplier> Add(Supplier item)
        {
            return _repository.Add(item);
        }

        public Task<Supplier> Get(int id)
        {
            return _repository.Get(id);
        }

        public Task<List<Supplier>> GetAll()
        {
            return _repository.GetAll();
        }

        public Task<Supplier> Update(int id, Supplier item)
        {
            return _repository.Update(id, item);
        }
        public async Task<Supplier> Login(string phoneNumber, string password)
        {
            List<Supplier> suppliers = await GetAll();
            return suppliers.Find(x => x.PhoneNumber == phoneNumber && x.Password == password);
        }
    }
}
