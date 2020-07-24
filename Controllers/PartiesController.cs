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

    [Route("api/[controller]")]
    [ApiController]
    public class PartiesController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly string BING_MAPS_KEY;


        public PartiesController(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            BING_MAPS_KEY = config["BING_MAPS_KEY"];

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
                                ThenInclude(comment => comment.User).
                                ToListAsync();

            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Party>> GetParty(int id)
        {
            var party = await _context.Parties.
                                Where(party => party.Id == id).
                                Include(party => party.Comments).
                                ThenInclude(comment => comment.User).
                                FirstOrDefaultAsync();


            if (party == null)
            {
                return NotFound();
            }

            return party;
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> PutParty(int id, Party party)
        {
            if (id != party.Id)
            {
                return BadRequest();
            }

            // var partyInDatabase = await _context.Parties.FindAsync(id);

            // if (partyInDatabase == null)
            // {
            //     return NotFound();
            // }
            // if (partyInDatabase.UserId != GetCurrentUserId())
            // {
            //     return NotFound();

            // }

            // Create a new geocoder
            var geocoder = new BingMapsGeocoder(BING_MAPS_KEY);

            // Request this address to be geocoded.
            var geocodedAddresses = await geocoder.GeocodeAsync(party.Address);

            // ... and pick out the best address sorted by the confidence level
            var bestGeocodedAddress = geocodedAddresses.OrderBy(address => address.Confidence).LastOrDefault();

            // If we have a best geocoded address, use the latitude and longitude from that result
            if (bestGeocodedAddress != null)
            {
                party.Latitude = bestGeocodedAddress.Coordinates.Latitude;
                party.Longitude = bestGeocodedAddress.Coordinates.Longitude;
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

            return Ok(party);
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Party>> PostParty(Party party)
        {
            // Create a new geocoder
            var geocoder = new BingMapsGeocoder(BING_MAPS_KEY);

            // Request this address to be geocoded.
            var geocodedAddresses = await geocoder.GeocodeAsync(party.Address);

            // ... and pick out the best address sorted by the confidence level
            var bestGeocodedAddress = geocodedAddresses.OrderBy(address => address.Confidence).LastOrDefault();

            // If we have a best geocoded address, use the latitude and longitude from that result
            if (bestGeocodedAddress != null)
            {
                party.Latitude = bestGeocodedAddress.Coordinates.Latitude;
                party.Longitude = bestGeocodedAddress.Coordinates.Longitude;
            }


            party.UserId = GetCurrentUserId();

            _context.Parties.Add(party);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParty", new { id = party.Id }, party);
        }


        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteParty(int id)
        {
            var party = await _context.Parties.FindAsync(id);
            if (party == null)
            {
                return NotFound();
            }
            if (party.UserId != GetCurrentUserId())
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
