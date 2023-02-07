using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RecipeWiki.Data;
using RecipeWiki.Entities;
using RecipeWiki.Entities.DTO;
using RecipeWiki.Entities.DTO.User;
using RecipeWiki.Helpers;

namespace RecipeWiki.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppSettings _appSettings;
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public AuthController(
        IOptions<AppSettings> appSettings,
        IMapper mapper,
        DataContext context)
    {
        _mapper = mapper;
        _context = context;
        _appSettings = appSettings.Value;
    }

    /// <summary>
    /// Login using email and password
    /// </summary>
    /// <returns>User info and jwt token</returns>
    /// <response code="200">Request successful</response>
    /// <response code="400">If the email or password is incorrect </response>
    [AllowAnonymous]
    [ProducesResponseType(typeof(LoginDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorMessage), StatusCodes.Status400BadRequest)]
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequestDTO model)
    {
        var user = Authenticate(model.Email, model.Password);

        if (user == null)
            return BadRequest(new ErrorMessage("Email or password is incorrect"));

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        // return basic user info and authentication token
        return Ok(new LoginDTO
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Token = tokenString
        });
    }

    /// <summary>
    /// User Registration
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="400">The email or password is incorrect </response>
    [AllowAnonymous]
    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequestDTO requestDTO)
    {
        

        try
        {
            Console.WriteLine(string.IsNullOrEmpty(requestDTO.Password.Trim()));
            if (string.IsNullOrEmpty(requestDTO.Password.Trim()))
                throw new Exception("Password is required");
            if (string.IsNullOrWhiteSpace(requestDTO.FirstName))
                throw new Exception("First name is required");
            if (string.IsNullOrWhiteSpace(requestDTO.LastName))
                throw new Exception("Last name is required");
            if (string.IsNullOrWhiteSpace(requestDTO.Email))
                throw new Exception("Email is required");
            
            // map model to entity
            var user = _mapper.Map<User>(requestDTO);
            
            if (_context.Users.Any(x => x.Email == user.Email))
                throw new Exception("\"" + user.Email + "\" is already taken");

            PasswordUtils.CreatePasswordHash(requestDTO.Password, out var passwordHash, out var passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            // create user
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception ex)
        {
            // return error message if there was an exception
            return BadRequest(new {message = ex.Message});
        }
    }


    /// <summary>
    /// User Registration
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="401">Unauthorized</response>
    [HttpPut("update")]
    public IActionResult Update([FromBody] UpdateRequestDTO requestDTO)
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        if (id == null) return Unauthorized("Unauthorized");
        // map model to entity and set id
        var userNew = _mapper.Map<User>(requestDTO);
        userNew.Id = id.Value;
        try
        {
            var user = _context.Users.Find(userNew.Id);
            if (user == null)
                throw new Exception("User not found");

            // update email if it has changed
            if (!string.IsNullOrWhiteSpace(userNew.Email) && userNew.Email != user.Email)
            {
                // throw error if the new email is already taken
                if (_context.Users.Any(x => x.Email == userNew.Email))
                    throw new Exception("Username " + userNew.Email + " is already taken");

                user.Email = userNew.Email;
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(userNew.FirstName))
                user.FirstName = userNew.FirstName;

            if (!string.IsNullOrWhiteSpace(userNew.LastName))
                user.LastName = userNew.LastName;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(requestDTO.Password))
            {
                PasswordUtils.CreatePasswordHash(requestDTO.Password, out var passwordHash, out var passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception ex)
        {
            // return error message if there was an exception
            return BadRequest(new {message = ex.Message});
        }
    }

    private User? Authenticate(string username, string password)
    {
        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            return null;

        var user = _context.Users.SingleOrDefault(x => x.Email == username);

        // check if username exists
        if (user == null)
            return null;

        // check if password is correct
        if (!PasswordUtils.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            return null;

        // authentication successful
        return user;
    }

    /// <summary>
    /// Delete user
    /// </summary>
    /// <response code="200">Request successful</response>
    /// <response code="401">Unauthorized</response>
    [HttpDelete("delete")]
    public IActionResult Delete()
    {
        var id = AuthController.GetUserId(HttpContext.User.Identity as ClaimsIdentity);
        var user = _context.Users.Find(id);
        if (user != null)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
            return Ok();
        }

        return Unauthorized();
    }

    public static int? GetUserId(ClaimsIdentity? identity)
    {
        if (int.TryParse(GetClaim(identity, ClaimTypes.Name), out var id))
            return id;
        return null;
    }

    private static string? GetClaim(ClaimsIdentity? identity, string claimType)
    {
        var userClaims = identity?.Claims;
        return userClaims?.FirstOrDefault(o => o.Type == claimType)?.Value;
    }
}