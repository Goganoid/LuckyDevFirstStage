using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SimpleAuth.Entities;

namespace SimpleAuth.Data;

public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sql server database
        options.UseSqlite(Configuration.GetConnectionString("ConnStr"));
    }
    public DbSet<User> Users { get; set; }
}