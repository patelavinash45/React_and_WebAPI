import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

// const originalExpenses = [
//     {
//         key: Math.random(),
//         name: "Buy Phone",
//         date: new Date(2024, 9, 6),
//         price: "200"
//     },
//     {
//         key: Math.random(),
//         name: "Buy Bike",
//         date: new Date(2022, 8, 6),
//         price: "200"
//     }
//     ,
//     {
//         key: Math.random(),
//         name: "Buy Car",
//         date: new Date(2023, 5, 6),
//         price: "800"
//     }
//     ,
//     {
//         key: Math.random(),
//         name: "Buy Clothes",
//         date: new Date(2021, 7, 6),
//         price: "200"
//     }
// ];

const yearAndMonth = {
    'Month' : 0,
    'Year': 0
}

const filterReducer = (state = yearAndMonth, action) => {
    if (action.type === "year") {
        return { ...state, Year: action.value };
    }
    if(action.type === "month"){
        return { ...state, Month: action.value };
    }
    return state;
};

const pageNoReducer = (state = 1, action) => {
    if (action.type === "pageNo") {
        return action.value;
    }
    return state;
};

const dataLoadReducer = (state = false, action) => {
    if (action.type === "reload") {
        return action.value;
    }
    return state;
};

const logInReducer = (state = false, action) => {
    if (action.type === "Logged") {
        return action.value;
    }
    return state;
};

const rootReducer = combineReducers({
    filter: filterReducer,
    dataLoad: dataLoadReducer,
    pageNo : pageNoReducer,
    logIn : logInReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;
