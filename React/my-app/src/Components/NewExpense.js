import React, { useState, useCallback } from "react";
import ExpenseForm from "./ExpenseForm";
import AddExpenseButton from "./AddExpenseButton";
import Card from "./UI/Card";
import '../App.css';

const expense = {
    name: "",
    price: "",
    date: "",
};

function NewExpense() {
    const [isShowForm, setIsShowForm] = useState(false);

    const onButtonClickHandler = useCallback(() => {
        setIsShowForm(true);
    }, []);

    const onCancelButtonClickHandler = useCallback(() => {
        setIsShowForm(false);
    }, []);

    return (
        <Card className="newExpense p-3 my-2 d-flex justify-content-center">
            {
                isShowForm
                    ? <ExpenseForm onFormCancel={onCancelButtonClickHandler} expense={expense} isUpdate={false} />
                    : <AddExpenseButton onButtonClick={onButtonClickHandler} />
            }
        </Card>
    );
}

export default NewExpense;