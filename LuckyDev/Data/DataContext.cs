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

    // protected override void OnConfiguring(DbContextOptionsBuilder options)
    // {
    //     // connect to sql server database
    //     // options.UseSqlite(Configuration.GetConnectionString("ConnStr"));
    //     options.UseSqlServer(Configuration.GetConnectionString("ConnStr"));
    // }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Configure the value converter for the Animal
        modelBuilder.Entity<User>()
            .Property(x => x.SavedMealsIds)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()); // Convert to List<String> for use
        modelBuilder.Entity<User>()
            .HasMany(u => u.UserMeals)
            .WithOne(m => m.User)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<CustomMeal>()
            .HasMany(m => m.Ingredients)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<CustomMeal> CustomMeals { get; set; }
}