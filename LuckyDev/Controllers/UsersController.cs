using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RecipeWiki.Data;
using RecipeWiki.Entities;
using RecipeWiki.Entities.DTO;
using RecipeWiki.Entities.DTO.Food;
using RecipeWiki.Entities.DTO.User;
using RecipeWiki.Helpers;

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

    /// <summary>
    /// Add mealId received from the MealDB API to user's saved meals
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="401">Unauthorized</response>
    [HttpPost("meals/saved/add/{mealId}")]
    public async Task<IActionResult> SaveMeal(string mealId)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users.FindAsync(id);
        if (user!.SavedMealsIds.Find(id => id == mealId) != null) return Conflict("Meal is already saved");
        user.SavedMealsIds.Add(mealId);
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Delete mealId received from the MealDB API from user's saved meals
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="401">Unauthorized</response>
    [HttpDelete("meals/saved/delete/{mealIdDel}")]
    public async Task<IActionResult> DeleteSavedMeal(string mealIdDel)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users.FirstAsync(u => u.Id == id);
        user.SavedMealsIds = user.SavedMealsIds.Where(mealId => mealId != mealIdDel).ToList();
        await _context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Add custom meal
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="409">Meal with the same name already exists</response>
    /// <response code="401">Unauthorized</response>
    [HttpPost("meals/custom/add")]
    public async Task<IActionResult> AddCustomMeal([FromBody] MealRequestDTO mealRequestDTO)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users.Include(u => u.UserMeals).FirstAsync(u => u.Id == id);
        if (user.UserMeals.FirstOrDefault(
                m => String.Equals(m.Name, mealRequestDTO.Name, StringComparison.CurrentCultureIgnoreCase))
            != null) return Conflict("Meal with the same name already exists");
        var meal = _mapper.Map<CustomMeal>(mealRequestDTO);
        user.UserMeals.Add(meal);
        await _context.SaveChangesAsync();
        return Ok(_mapper.Map<CustomMealResponseDTO>(meal));
    }

    /// <summary>
    /// Delete custom meal
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="401">Unauthorized</response>
    [HttpDelete("meals/custom/delete/{mealIdDel:int}")]
    public async Task<IActionResult> DeleteCustomMeal(int mealIdDel)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users
            .Include(u => u.UserMeals)
            .FirstAsync(u => u.Id == id);
        var meal = user.UserMeals.FirstOrDefault(m => m.Id == mealIdDel);
        if (meal != null) _context.CustomMeals.Remove(meal);
        await _context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Get both saved meals and custom meals
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="401">Unauthorized</response>
    [Produces("application/json")]
    [ProducesResponseType(typeof(UserMealsResponseDTO), StatusCodes.Status200OK)]
    [HttpGet("meals/get")]
    public async Task<IActionResult> GetMeals()
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users
            .Include(u => u.UserMeals)
                .ThenInclude(m=>m.Ingredients)
            .Include(u => u.StoredIngredients)
            .FirstOrDefaultAsync(u => u.Id == id);
        var meals = _mapper.Map<UserMealsResponseDTO>(user);
        return Ok(meals);
    }

    /// <summary>
    /// Add ingredientId received from the MealDB API to user ingredients 
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="401">Unauthorized</response>
    [HttpPost("stored-ingredients/add/{IngredientName}")]
    public async Task<IActionResult> AddStoredIngredient(string IngredientName)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users.Include(u => u.StoredIngredients).FirstOrDefaultAsync(u => u.Id == id);
        if (user!.StoredIngredients.Find(i => i.Name == IngredientName) != null)
            return Conflict("This ingredient is already stored");
        var ingredient = new Ingredient() {Name = IngredientName};
        user.StoredIngredients.Add(ingredient);
        await _context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Get list of ingredient ids
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="401">Unauthorized</response>
    [ProducesResponseType(typeof(List<string>), StatusCodes.Status200OK)]
    [Produces("application/json")]
    [HttpGet("stored-ingredients/get")]
    public async Task<IActionResult> GetStoredIngredients()
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users.Include(u => u.StoredIngredients)
            .FirstAsync(u => u.Id == id);
        return Ok(user.StoredIngredients.Select(i => _mapper.Map<IngredientDTO>(i)));
    }

    /// <summary>
    /// Remove ingredient with id
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="401">Unauthorized</response>
    [HttpDelete("stored-ingredients/delete/{ingredientName}")]
    public async Task<IActionResult> DeleteStoredIngredient(string ingredientName)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users.Include(u => u.StoredIngredients).FirstAsync(u => u.Id == id);
        var ingredient = user.StoredIngredients.FirstOrDefault(i => i.Name == ingredientName);
        if (ingredient != null) _context.Ingredients.Remove(ingredient);
        await _context.SaveChangesAsync();
        return Ok();
    }


    /// <summary>
    /// Get user profile info
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="401">Unauthorized</response>
    [Produces("application/json")]
    [ProducesResponseType(typeof(UserResponseDTO), StatusCodes.Status200OK)]
    [HttpGet("info")]
    public async Task<IActionResult> GetById()
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = await _context.Users.FindAsync(id);
        var model = _mapper.Map<UserResponseDTO>(user);
        return Ok(model);
    }
}