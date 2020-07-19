namespace Tailgate.Models
{
    public class Party
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

        public string Menu { get; set; }
        public string Type { get; set; }
        public string Event { get; set; }
    }
}