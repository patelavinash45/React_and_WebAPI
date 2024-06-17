import '../App.css';
import React from 'react';

function AddExpenseButton(props){

    const onButtonClickHandler = () =>{
        props.onButtonClick();
    };

    return (
        <button onClick={onButtonClickHandler} className='newExpenseButton btn text-white py-3 px-3 rounded-4 fs-5'>
            Add New Expense
        </button>
    );
}

export default React.memo(AddExpenseButton);