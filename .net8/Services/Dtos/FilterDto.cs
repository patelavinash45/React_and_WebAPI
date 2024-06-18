namespace Services.Dtos
{
    public class FilterDto
    {
        public required string SearchElement { get; set; }

        public bool IsVeg { get; set; }

        public bool IsHighToLow { get; set; }
    }
}