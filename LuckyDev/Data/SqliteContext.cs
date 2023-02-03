using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace RecipeWiki.Data;

public class SqliteContext : DataContext
{
    public SqliteContext(IConfiguration configuration) : base(configuration)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sql server database
        options.UseSqlite("Data Source=localdb.db");
        // options.UseSqlServer(Configuration.GetConnectionString("ConnStr"));
    }
}