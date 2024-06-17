import { useState } from "react";
import ItemView from "./ItemView";
import { CircularProgress } from "@mui/material";
import { GetFoodList } from "../../../API/APICall";

let foodItems = [];

const ItemList = () => {
    const [isDataLoad, setIsDataLoad] = useState(false);

    const getFoodItems = async () => {
        const result = await GetFoodList();
        if (result.IsSusses) {
            foodItems = result.Data;
            setIsDataLoad(true);
        }
    };

    if (!isDataLoad) {
        getFoodItems();
    }

    return (
        isDataLoad
            ? foodItems.map(foodItem => <ItemView key={foodItem.foodId} foodItem={foodItem} />)
            : <CircularProgress />
    );
};

export default ItemList;