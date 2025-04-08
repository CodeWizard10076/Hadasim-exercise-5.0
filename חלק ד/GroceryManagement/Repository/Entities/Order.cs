using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int SupplierId { get; set; }
        
        public virtual Supplier Supplier { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; } = "waiting";
        public ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();

    }
}
