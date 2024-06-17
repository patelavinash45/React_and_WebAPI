import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

const OrderPlace = React.forwardRef((props, ref) => {

    const [isButtonClick, setIsButtonClick] = useState(false);
    const [isValidAddress, setIsValidAddress] = useState(false);

    const onButtonClick = async () => {
        setIsButtonClick(true);
        if (ref.current.value.length > 0) {
            await props.placeOrderButtonClick();
        }
        else {
            setIsValidAddress(true);
        }
        setIsButtonClick(false);
    }

    return (
        <div className='mt-2'>
            <TextField
                inputRef={ref}
                id="outlined-basic"
                error={isValidAddress}
                label="Address"
                variant="outlined"
                multiline
                rows={4}
                sx={{ width: '100%' }}
            />
            <div className='d-flex justify-content-end mt-2'>
                {
                    isButtonClick
                        ? <CircularProgress />
                        : <Button variant='contained' onClick={onButtonClick}>
                            Confirm Order
                        </Button>
                }
            </div>
        </div>
    );
});

export default OrderPlace;