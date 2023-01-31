using AutoMapper;
using MyPlan.Models.User;
using RecipeWiki.Entities;
using RecipeWiki.Entities.DTO;

namespace MyPlan.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<User, UserModel>();
        CreateMap<RegisterModel, User>();
        CreateMap<UpdateModel, User>();
        CreateMap<User, UserDTO>();

        CreateMap<User, UserRecipesDTO>();
        CreateMap<IngredientModel, Ingredient>();
        CreateMap<MealModel, CustomMeal>();
    }
}