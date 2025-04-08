using Microsoft.Extensions.DependencyInjection;
using Service.Interfaces;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public static class ExtentionMethods
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {

            services.AddScoped<IService<Order>, OrderService>();
            services.AddScoped<IService<OrderProduct>, OrderProductService>();
            services.AddScoped<IService<Product>, ProductService>();
            services.AddScoped<IService<Supplier>, SupplierService>();

            return services;
        }
    }
}
