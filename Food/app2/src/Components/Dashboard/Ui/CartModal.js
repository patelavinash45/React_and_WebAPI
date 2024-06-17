import { IconButton, Modal, Paper, Divider } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import CloseIcon from '@mui/icons-material/Close';
import OrderPlace from "./OrderPlace";
import './ItemView.css';
import { useRef, useEffect } from "react";
import { PlaceOrder } from "../../../API/APICall";
import { Cart } from "../../../Store/Store";

const CartModal = props => {

    const addRef = useRef();
    const cartDispatch = useDispatch();
    const cartDetails = useSelector(state => state);
    
    useEffect(()=>{
        if (cartDetails.length <= 0) {
            props.onModelClose();
        }
    },[cartDetails])


    let totalAmount = 0;
    const divList = [];
    cartDetails.forEach(cart => {
        totalAmount += (cart.getcart[6] * cart.getcart[2]);
        divList.push(
            <CartItem
                key={cart.getcart[0]}
                cartItem={cart.getcart}
            />
        );
    });

    totalAmount = totalAmount.toFixed(2);

    const onCloseButtonClick = () => {
        props.onModelClose();
    }

    const onPlaceOrderButtonClick = async () => {
        const orderDetailsDto = [];
        cartDetails.forEach(cart => {
            orderDetailsDto.push({
                "foodId": cart.getcart[3],
                "count": cart.getcart[3],
                "amount": cart.getcart[6]
            });
        });
        const orderDTo = {
            "address": addRef.current.value,
            "totalAmount": totalAmount,
            "orderDetailsDtos": orderDetailsDto
        };
        const result = await PlaceOrder(orderDTo, 1);
        if (result.IsSusses) {
            cartDispatch(Cart.actions.storeCartData([]));
        }
    }

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={true}
            closeAfterTransition
        >
            <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
                <Paper elevation={3} sx={{ p: 2, width: '500px' }}>
                    <div className="fs-3 fw-bold d-flex justify-content-between">
                        Cart
                        <IconButton onClick={onCloseButtonClick}>
                            <CloseIcon color='primary' />
                        </IconButton>
                    </div>
                    <div className="border-1 border p-2 rounded-2 border-primary    ">
                        {divList}
                        <Divider />
                        <div className="d-flex justify-content-between fs-5 align-items-center fw-semibold">
                            Total Amount :
                            <span className="addDiv bg-primary d-flex text-white align-items-center justify-content-center rounded-2">
                                {totalAmount}
                            </span>
                        </div>
                        <Divider>
                            Place Order
                        </Divider>
                        <OrderPlace ref={addRef} placeOrderButtonClick={onPlaceOrderButtonClick} />
                    </div>
                </Paper>
            </div>
        </Modal>
    );
};

export default CartModal;