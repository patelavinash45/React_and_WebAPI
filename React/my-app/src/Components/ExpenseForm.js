import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { addExpenses, updateExpenses } from './APIRequest/api';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/joy/CircularProgress';
import { NameValidate, PriceValidate, DateValidate, FormateDate } from './Store/FormValidation';
import FormInput from './UI/FormInputs';

function ExpenseForm(props) {
    const nameRef = useRef(props.expense.name);
    const priceRef = useRef(props.expense.price);
    const dateRef = useRef(FormateDate(props.expense.date));
    const [isButtonClicked, setButtonClicked] = useState(false);

    const reloadDispatch = useDispatch();
    const formSubmitHandler = async (event) => {
        setButtonClicked(true);
        event.preventDefault();
        if (NameValidate(nameRef.current.value) && PriceValidate(priceRef.current.value) && DateValidate(dateRef.current.value)) {
            let expenseData = {
                name: nameRef.current.value,
                price: parseFloat(priceRef.current.value),
                date: new Date(dateRef.current.value),
                id: props.isUpdate ? props.expense.id : undefined
            };
            let result = props.isUpdate
                ? await updateExpenses(expenseData).then((result) => result)
                : await addExpenses(expenseData).then((result) => result)
            if (result) {
                props.onFormCancel();
                reloadDispatch({ type: "reload", value: false });
            }
        }
        setButtonClicked(false);
    };

    const onCancelButtonClickHandler = () => props.onFormCancel();

    return (
        <form onSubmit={formSubmitHandler} className='w-100'>
            <div className="row">
                <FormInput ref={nameRef} placeholder='Name' type='text' validateFunction={NameValidate} />
                <FormInput ref={priceRef} placeholder='Price' type='Number' validateFunction={PriceValidate} />
                <FormInput ref={dateRef} placeholder='Amount' type='Date' validateFunction={DateValidate} />
            </div>
            <div className="d-flex justify-content-end">
                {
                    isButtonClicked
                        ? <CircularProgress variant="solid" color="neutral" />
                        : <span>
                            <button className='btn bg-danger border border-2 text-white me-2' type='button' onClick={onCancelButtonClickHandler}>
                                Cancel
                            </button>
                            <button className='btn bg-black border border-2 text-white' type='submit'>
                                {
                                    props.isUpdate ? "Update Expense" : "Add Expense"
                                }
                            </button>
                        </span>
                }
            </div>
        </form>
    );
}

export default React.memo(ExpenseForm);