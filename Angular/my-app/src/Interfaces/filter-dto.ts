export interface FilterDto {
    searchElement: string | null,
    lowToHigh: boolean,
    foodType: FoodType
};

const enum FoodType {
    NoFilter,
    Veg,
    NonVeg
}
