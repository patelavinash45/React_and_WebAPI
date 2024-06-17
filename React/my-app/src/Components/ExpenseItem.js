import Card from './UI/Card';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { ReactComponent as Trash } from '../trash.svg';
import { ReactComponent as Edit } from '../edit.svg';
import { useState } from 'react';
import DeleteModal from './UI/DeleteModal';
import ExpenseForm from './ExpenseForm';
import ExpenseDateAndName from './UI/ExpenseDateAndName';
import { useCallback } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/joy/Divider';
import IconButton from './UI/IconButton';

function ExpenseItem(props) {
    const [modalShow, setModalShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDollar, setIsDollar] = useState(true);

    const onDeleteButtonHandler = () => setModalShow(true);
    const onEditButtonHandler = () => setIsEdit(!isEdit);
    const onEditCancelButtonHandler = useCallback(() => setIsEdit(false), []);
    const dismissModal = useCallback((isDismissModal) => setModalShow(isDismissModal), []);
    const onCurrencyButtonClick = () => {
        isDollar ? props.expense.price *= 80 : props.expense.price /= 80;
        props.expense.price = props.expense.price.toFixed(2);
        setIsDollar(!isDollar);
    };

    const classes = 'expenseDiv d-flex justify-content-between align-items-center text-white px-3 py-3 mt-2 ' + (isEdit ? ' rounded-bottom-0 border-bottom-0' : '')

    const modalDiv = modalShow && <DeleteModal id={props.expense.id} dismissModal={dismissModal} />;
    return (
        <div>
            <Card className={classes} >
                <ExpenseDateAndName date={props.expense.date} name={props.expense.name} />
                <div className='d-flex align-items-center'>
                    <IconButton children={<Trash />} onButtonClick={onDeleteButtonHandler} />
                    {
                        !isEdit && <IconButton children={<Edit />} onButtonClick={onEditButtonHandler} />
                    }
                    <Card className='priceDiv px-4 py-2 d-flex align-items-center'>
                        <Button variant="text" className='bg-transparent border-0 text-white fs-2 fw-bold w-100 h-100' onClick={onCurrencyButtonClick}>
                            {
                                isDollar ? '$' : '₹'
                            }
                            {props.expense.price}
                        </Button>
                    </Card>
                    {modalDiv}
                </div>
            </Card>
            {
                isEdit
                && <div>
                    <Divider orientation="horizontal" sx={{ bgcolor: '#424242', color: 'white', fontSize: '15px' }}>
                        Update Expense
                    </Divider>
                    <Card className='expenseDiv p-3 border-top-0 rounded-top-0 border-white'>
                        <ExpenseForm expense={props.expense} onFormCancel={onEditCancelButtonHandler} isUpdate={true} />
                    </Card>
                </div>
            }
        </div>
    );
}

export default ExpenseItem;