namespace Services.Dtos
{
    public class FilterDto
    {
        public string? SearchElement { get; set; } = null;

        public bool LowToHigh { get; set; } = true;
    }
}