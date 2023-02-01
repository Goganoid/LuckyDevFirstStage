using System.Linq;
using RecipeWiki.Entities;

namespace RecipeWiki.Data;

public static class DbInitializer
{
    public static void Initialize(DataContext context)
    {
        if (context.Users.Any()) return; // DB has been seeded
        var users = new User[]
        {
            new("John", "Doe", "john_doe@gmail.com", "123456"),
        };
        context.Users.AddRange(users);
        context.SaveChanges();
    }
}