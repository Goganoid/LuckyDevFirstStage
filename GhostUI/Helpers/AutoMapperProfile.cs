using AutoMapper;
using MyPlan.Models.User;
using SimpleAuth.Entities;

namespace MyPlan.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<User, UserModel>();
        CreateMap<RegisterModel, User>();
        CreateMap<UpdateModel, User>();
        CreateMap<User,UserDTO>();
    }
}
