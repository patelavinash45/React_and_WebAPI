import { configureStore, createSlice } from '@reduxjs/toolkit';

const Cart = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(items, action) {
            let isFound = false;
            items.forEach(item => {
                if (item.getcart[0] == action.payload.getcart[0] && item.getcart[1] == action.payload.getcart[1]) {
                    item.getcart[2] += action.payload.getcart[2];
                    isFound = true;
                }
            })
            return isFound ? items : [action.payload, ...items];
        },
        storeCartData(items, action) {
            return action.payload;
        },
        changeProductCount(item, action) {
            return item.forEach(cart => {
                if (cart.getcart[0] == action.payload.id) {
                    cart.getcart[2] = action.payload.newCount;
                }
            });
        },
        removeFromCart(item, action) {
            return item.filter(cart => cart.getcart[0] != action.payload.id);
        }
    }
});

const Store = configureStore({
    reducer: Cart.reducer,
});

export { Store, Cart as Cart };