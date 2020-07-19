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
    // All of these routes will be at the base URL:     /api/Parties
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case PartiesController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class PartiesController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public PartiesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Parties
        //
        // Returns a list of all your Parties
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Party>>> GetParties()
        {
            // Uses the database context in `_context` to request all of the Parties and
            // return them as a JSON array.
            return await _context.Parties.ToListAsync();
        }

        // GET: api/Parties/5
        //
        // Fetches and returns a specific party by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Party>> GetParty(int id)
        {
            // Find the party in the database using `FindAsync` to look it up by id
            var party = await _context.Parties.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (party == null)
            {
                // Return a `404` response to the client indicating we could not find a party with this id
                return NotFound();
            }

            //  Return the party as a JSON object.
            return party;
        }

        // PUT: api/Parties/5
        //
        // Update an individual party with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Party
        // variable named party. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Party POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParty(int id, Party party)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != party.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in party to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from party
            _context.Entry(party).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!PartyExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the updated data.
            //
            // return Ok(party)
            //
            return NoContent();
        }

        // POST: api/Parties
        //
        // Creates a new party in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Party
        // variable named party. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Party POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Party>> PostParty(Party party)
        {
            // Indicate to the database context we want to add this new record
            _context.Parties.Add(party);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetParty", new { id = party.Id }, party);
        }

        // DELETE: api/Parties/5
        //
        // Deletes an individual party with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParty(int id)
        {
            // Find this party by looking for the specific id
            var party = await _context.Parties.FindAsync(id);
            if (party == null)
            {
                // There wasn't a party with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Parties.Remove(party);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the deleted data.
            //
            // return Ok(party)
            //
            return NoContent();
        }

        // Private helper method that looks up an existing party by the supplied id
        private bool PartyExists(int id)
        {
            return _context.Parties.Any(party => party.Id == id);
        }
    }
}
