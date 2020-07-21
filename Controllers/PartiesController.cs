using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tailgate.Models;

namespace Tailgate.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PartiesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PartiesController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Party>>> GetParties(string filter)
        {
            if (filter == null)
            {
                return await _context.Parties.
                                OrderBy(party => party.Name).
                                Include(party => party.Comments).
                                ToListAsync();

            }
            else
            {
                // this is now filtering the parties by their name 
                return await _context.Parties.
                                Where(party => party.Name.ToUpper().
                                Contains(filter.ToUpper())).
                                OrderBy(party => party.Name).
                                Include(party => party.Comments).
                                ToListAsync();

            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Party>> GetParty(int id)
        {
            var party = await _context.Parties.
                                Where(party => party.Id == id).
                                Include(party => party.Comments).
                                FirstOrDefaultAsync();


            if (party == null)
            {
                return NotFound();
            }

            return party;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutParty(int id, Party party)
        {
            if (id != party.Id)
            {
                return BadRequest();
            }

            _context.Entry(party).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!PartyExists(id))
                {

                    return NotFound();
                }
                else
                {

                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Party>> PostParty(Party party)
        {
            party.UserId = GetCurrentUserId();

            _context.Parties.Add(party);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParty", new { id = party.Id }, party);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParty(int id)
        {
            var party = await _context.Parties.FindAsync(id);
            if (party == null)
            {
                return NotFound();
            }

            _context.Parties.Remove(party);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PartyExists(int id)
        {
            return _context.Parties.Any(party => party.Id == id);
        }

        private int GetCurrentUserId()
        {
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }

    }
}
