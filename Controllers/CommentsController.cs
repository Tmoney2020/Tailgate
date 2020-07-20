using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tailgate.Models;

namespace Tailgate.Controllers
{
    // All of these routes will be at the base URL:     /api/Comments
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case CommentsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public CommentsController(DatabaseContext context)
        {
            _context = context;
        }




        // POST: api/Comments
        //
        // Creates a new comment in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Comment
        // variable named comment. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Comment POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            // Indicate to the database context we want to add this new record
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetComment", new { id = comment.Id }, comment);
        }

        // DELETE: api/Comments/5
        //
        // Deletes an individual comment with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            // Find this comment by looking for the specific id
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                // There wasn't a comment with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Comments.Remove(comment);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the deleted data.
            //
            // return Ok(comment)
            //
            return NoContent();
        }

    }
}
