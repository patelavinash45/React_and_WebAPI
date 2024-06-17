import { Button, Slide, CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemView.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Cart } from '../../../Store/Store';
import { AddProductToCart } from '../../../API/APICall';
import IncrementDecrementDiv from './IncrementDecrementDiv';
import ItemDetailsDiv from './ItemDetailsDiv';
import AlertMessage from '../../Common/AlertMessage';

const ItemView = ({ foodItem }) => {

    const [isAddToCartButtonClick, setIsAddToCartButtonClick] = useState(false);
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [count, setCount] = useState(0);
    const addItemDispatch = useDispatch();

    const onIncrementButtonClick = () => {
        (count + 1) <= 10 ? setCount(count + 1) : setIsShowAlert(true);
    }

    const onDecrementButtonClick = () => {
        setCount(count - 1);
    }

    const closeAlert = () => {
        setIsShowAlert(false);
    }

    const onAddToCartButtonClick = async () => {
        setIsAddToCartButtonClick(true);
        const cart = {
            'userId': 1,
            'count': count,
            'foodId': foodItem.foodId
        };
        const result = await AddProductToCart(cart, 1);
        if (result.IsSusses) {
            const item = {
                getcart: [result.Data.cartId, result.Data.userId, count, foodItem.foodId, foodItem.isVeg, foodItem.name, foodItem.price],
            };
            setIsShowAlert(true);
            addItemDispatch(Cart.actions.addToCart(item));
            setCount(0);
        }
        setIsAddToCartButtonClick(false);
    }

    return (
        <Slide direction='up' mountOnEnter in={true} >
            <div
                className="bg-body-secondary item mx-5 bg-white rounded-pill d-flex align-items-center justify-content-between mb-3 border-1 border border-black"
            >
                <ItemDetailsDiv foodItem={foodItem} />
                <span className='me-5'>
                    {
                        count == 0
                            ? <Button
                                variant="contained"
                                className='addDiv'
                                onClick={onIncrementButtonClick}
                            >
                                Add
                            </Button>
                            : <div className='text-center'>
                                <IncrementDecrementDiv
                                    count={count}
                                    decrementButtonClick={onDecrementButtonClick}
                                    incrementButtonClick={onIncrementButtonClick}
                                />
                                {
                                    isAddToCartButtonClick
                                        ? <CircularProgress />
                                        : <Button variant="contained" className='addDiv' onClick={onAddToCartButtonClick}>
                                            Add To Cart
                                        </Button>
                                }
                            </div>
                    }
                </span>
                {
                    isShowAlert
                    && <AlertMessage
                        message={count < 10 ? "Added" : "Max Limit!"}
                        alertType={count < 10 ? "success" : "warning"}
                        closeAlert={closeAlert}
                    />
                }
            </div>
        </Slide>
    );
};

export default ItemView;