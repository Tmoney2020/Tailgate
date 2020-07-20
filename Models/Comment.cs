using System;

namespace Tailgate.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; private set; } = DateTime.Now;
        public string Flair { get; set; }
        public int PartyId { get; set; }
    }
}