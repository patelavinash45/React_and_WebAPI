import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Card from './Card';

const ExpenseDateAndName = props => {
    const month = props.date.toLocaleString('en-Us', { month: 'long' });
    const day = props.date.toLocaleString('en-Us', { day: '2-digit' });
    const year = props.date.getFullYear();

    return (
        <div className='d-flex align-items-center justify-content-center text-center'>
            <Card className='dateDiv py-2 me-2'>
                <div className='fs-6 fw-bold'>{month}</div>
                <div className='fs-6'>{year}</div>
                <div className='fs-4 fw-bold'>{day}</div>
            </Card>
            <div className='fs-2 fw-bold'>
                {props.name}
            </div>
        </div>
    );
};
export default React.memo(ExpenseDateAndName);