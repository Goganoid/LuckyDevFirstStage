using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MyPlan.Controllers;
using MyPlan.Helpers;
using MyPlan.Models.User;
using RecipeWiki.Data;
using RecipeWiki.Entities;
using RecipeWiki.Entities.DTO;

namespace RecipeWiki.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppSettings _appSettings;
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public UsersController(
        IOptions<AppSettings> appSettings,
        IMapper mapper,
        DataContext context)
    {
        _mapper = mapper;
        _context = context;
        _appSettings = appSettings.Value;
    }

    [HttpPost("/save-meal/{mealId}")]
    public async Task<IActionResult> SaveMeal(string mealId)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound("User not found");

        user.SavedMealsIds.Add(mealId);
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("add-meal")]
    public async Task<IActionResult> AddMeal([FromBody] MealModel mealModel)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users.Include(u => u.UserMeals).FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return NotFound("User not found");
        if (user.UserMeals.FirstOrDefault(
                m => String.Equals(m.Name, mealModel.Name, StringComparison.CurrentCultureIgnoreCase))
            != null) return Conflict("Meal with the same name already exists");
        var meal = _mapper.Map<CustomMeal>(mealModel);
        user.UserMeals.Add(meal);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("meals")]
    public async Task<IActionResult> GetMeals()
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users.Include(u => u.UserMeals).ThenInclude(m => m.Ingredients)
            .FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return NotFound("User not found");
        var meals = _mapper.Map<UserRecipesDTO>(user);
        return Ok(meals);
    }

    [HttpGet("info")]
    public IActionResult GetById()
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = _context.Users.Find(id);
        var model = _mapper.Map<UserModel>(user);
        return Ok(model);
    }
}