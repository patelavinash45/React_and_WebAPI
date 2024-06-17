import { useState } from "react";
import ItemView from "./ItemView";
import { CircularProgress } from "@mui/material";
import { GetFoodList } from "../../../API/APICall";
import { useNavigate } from "react-router-dom";

let foodItems = [];

const ItemList = () => {

    const navigate = useNavigate();
    const [isDataLoad, setIsDataLoad] = useState(false);

    const getFoodItems = async () => {
        const result = await GetFoodList();
        if (result.IsSusses) {
            foodItems = result.Data;
            setIsDataLoad(true);
        }
        else {
            navigate(result.Navigate, { state: result.Data });
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