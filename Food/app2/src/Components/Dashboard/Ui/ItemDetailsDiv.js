import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const ItemDetailsDiv = ({ foodItem }) => {
    return (
        <span className='d-flex align-items-center span'>
            <img
                src={require(`../../../Images/${foodItem.name}.png`)}
                className='itemImage rounded-pill rounded-end me-4'
            />
            <div className='me-5'>
                <div className='fs-3'>
                    {foodItem.name}
                </div>
                {
                    foodItem.isVeg
                        ? <div>
                            <img
                                src={require('../../../Images/veg-icon.png')}
                                className='vegImage me-1'
                            />
                            Veg
                        </div>
                        : <div>
                            <img
                                src={require('../../../Images/nonVeg-icon.png')}
                                className='vegImage me-1'
                            />
                            Non-Veg
                        </div>
                }
                <div>
                    ₹ {foodItem.price}
                </div>
            </div>
        </span>
    );
};

export default React.memo(ItemDetailsDiv);