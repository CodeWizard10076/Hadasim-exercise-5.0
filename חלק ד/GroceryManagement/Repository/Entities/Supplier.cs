using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class Supplier
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string PhoneNumber { get; set; }
        public string SupplierName { get; set;}
        public string Password { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
