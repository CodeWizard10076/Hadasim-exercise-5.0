using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mock
{
    public class DataBase : DbContext, IContext
    {
        public DbSet<Order> Order { get ; set ; }
        public DbSet<OrderProduct> OrderProduct { get ; set ; }
        public DbSet<Product> Product { get ; set ; }
        public DbSet<Supplier> Supplier { get ; set ; }

        public async Task Save()
        {
            try
            {
                await SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving changes: {ex.Message}");
                throw; // שמירה על זריקת השגיאה המקורית
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OrderId)
                .OnDelete(DeleteBehavior.Cascade); // רק זה עושה Cascade

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Product)
                .WithMany()
                .HasForeignKey(op => op.ProductId)
                .OnDelete(DeleteBehavior.Restrict); // זה מונע את השגיאה של multiple cascade paths
        }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=localhost;database=grocery;trusted_connection=true;TrustServerCertificate=true;", b => b.MigrationsAssembly("GroceryManagement"));
        }
    }
}
