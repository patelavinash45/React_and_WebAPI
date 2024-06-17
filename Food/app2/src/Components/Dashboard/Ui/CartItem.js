import 'bootstrap/dist/css/bootstrap.min.css';
import IncrementDecrementDiv from './IncrementDecrementDiv';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Cart } from '../../../Store/Store';
import { ChangeProductCount } from '../../../API/APICall';

const CartItem = ({ cartItem }) => {

    const changeCountDispatch = useDispatch();
    const [count, setCount] = useState(cartItem[2]);

    const handleCount = newCount => {
        ChangeProductCount(cartItem[0], newCount, 1);
        newCount != 0
            ? changeCountDispatch(Cart.actions.changeProductCount({ id: cartItem[0], newCount: newCount }))
            : changeCountDispatch(Cart.actions.removeFromCart({ id: cartItem[0] }))
        setCount(newCount);
    }

    const onIncrementButtonClick = () => {
        handleCount(count + 1);
    }

    const onDecrementButtonClick = () => {
        handleCount(count - 1);
    }

    return (
        <div className="d-flex justify-content-between">
            <div>
                <div className='d-flex flex-column'>
                    <span>
                        {cartItem[5]}
                    </span>
                    <span>
                        ₹{cartItem[6]}
                    </span>
                </div>
            </div>
            <div>
                <IncrementDecrementDiv
                    count={count}
                    decrementButtonClick={onDecrementButtonClick}
                    incrementButtonClick={onIncrementButtonClick}
                />
            </div>
        </div>
    );
}

export default CartItem;