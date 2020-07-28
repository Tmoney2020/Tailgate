using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using NetTopologySuite.Geometries;

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
        [JsonIgnore]
        public Point Location { get; set; }
        public double Latitude
        {
            get
            {
                return this.Location != null && this.Location.Coordinate != null ? this.Location.Coordinate.X : 0;
            }
        }
        public double Longitude
        {
            get
            {
                return this.Location != null && this.Location.Coordinate != null ? this.Location.Coordinate.Y : 0;
            }
        }
        public string PhotoURL { get; set; }
        public string Menu { get; set; }
        public string Type { get; set; }
        public string Event { get; set; }
        public List<Comment> Comments { get; set; }
    }
}