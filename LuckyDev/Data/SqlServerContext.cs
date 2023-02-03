using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace RecipeWiki.Data;

public class SqlServerContext : DataContext
{
    public SqlServerContext(IConfiguration configuration) : base(configuration)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sql server database
        // options.UseSqlite(Configuration.GetConnectionString("ConnStr"));
        options.UseSqlServer(Configuration.GetConnectionString("ConnStr"));
    }
}