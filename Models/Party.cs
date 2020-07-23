using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Tailgate.Models
{
    public class Party
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public string StartTime { get; set; }
        [Required]
        public string EndTime { get; set; }
        public int UserId { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string PhotoURL { get; set; }
        public string Menu { get; set; }
        public string Type { get; set; }
        public string Event { get; set; }
        public List<Comment> Comments { get; set; }
    }
}