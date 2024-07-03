namespace Services.Dtos
{
    public enum FoodType
    {
        NoFilter,
        Veg,
        NonVeg
    }
    public class FilterDto
    {
        public string? SearchElement { get; set; } = null;

        public bool LowToHigh { get; set; } = true;

        public FoodType FoodType { get; set; } = FoodType.NoFilter;
    }
}