using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Geocoding.Microsoft;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Tailgate.Models;

namespace Tailgate.Controllers
{
    // All of these routes will be at the base URL:     /api/Users
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case UsersController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public UsersController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.
                                Where(user => user.Id == id).
                                FirstOrDefaultAsync();


            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (GetCurrentUserId() != user.Id)
            {
                return BadRequest();
            }

            // if (GetCurrentUserPassword() == null)
            // {
            //     return BadRequest();

            // }

            var userExists = await _context.Users.Where(user => user.Id == GetCurrentUserId()).AnyAsync();
            if (!userExists)
            {
                // There wasn't a restaurant with that id so return a `404` not found
                return NotFound();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!UserExists(id))
                {

                    return NotFound();
                }
                else
                {

                    throw;
                }
            }

            return Ok(user);
        }


        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var alreadyHaveUserWithTheEmail = _context.Users.Any(existingUser => existingUser.Email.ToLower() == user.Email.ToLower());
            if (alreadyHaveUserWithTheEmail)
            {
                // Make a custom error response
                var response = new
                {
                    status = 400,
                    errors = new List<string>() { "This account already exists!" }
                };

                // Return our error with the custom response
                return BadRequest(response);
            }
            // Indicate to the database context we want to add this new record
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(user => user.Id == id);
        }
        private int GetCurrentUserId()
        {
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }

        // private string GetCurrentUserPassword()
        // {
        //     return (User.Claims.FirstOrDefault(claim => claim.Type == "Password").Value);
        // }

    }
}
