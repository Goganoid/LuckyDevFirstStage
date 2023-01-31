using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RecipeWiki.Entities;

namespace RecipeWiki.Data;

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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure the value converter for the Animal
        modelBuilder.Entity<User>()
            .Property(x => x.SavedMealsIds)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()); // Convert to List<String> for use
    }

    public DbSet<User> Users { get; set; }
}