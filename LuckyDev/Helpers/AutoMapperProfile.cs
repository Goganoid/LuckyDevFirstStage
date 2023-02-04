using AutoMapper;
using RecipeWiki.Entities;
using RecipeWiki.Entities.DTO;
using RecipeWiki.Entities.DTO.Food;
using RecipeWiki.Entities.DTO.User;

namespace RecipeWiki.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<RegisterRequestDTO, User>();
        CreateMap<UpdateRequestDTO, User>();
        CreateMap<User, UserResponseDTO>();

        CreateMap<User, UserMealsResponseDTO>();
        CreateMap<IngredientDTO, Ingredient>();
        CreateMap<Ingredient, IngredientDTO>();
        CreateMap<StoredIngredientDTO, Ingredient>();
        CreateMap<Ingredient, StoredIngredientDTO>();
        CreateMap<MealRequestDTO, CustomMeal>();
        CreateMap<CustomMeal, CustomMealResponseDTO>();
    }
}