using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Context
{
    public class DesafioContext : DbContext
    {
        public DesafioContext(DbContextOptions<DesafioContext> options) : base(options)
        {

        }

        public DbSet<Departamento> Departamentos { get; set; }

        public DbSet<Produto> Produtos { get; set; }
    }
}