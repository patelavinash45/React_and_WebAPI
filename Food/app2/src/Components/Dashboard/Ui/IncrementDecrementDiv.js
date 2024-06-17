import { IconButton } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemView.css';

const IncrementDecrementDiv = props => {

    const onDecrementButtonClick = () => {
        props.decrementButtonClick();
    };

    const onIncrementButtonClick = () => {
        props.incrementButtonClick();
    };

    return (
        <div className='addDiv bg-primary d-flex text-white align-items-center justify-content-center rounded-2 mb-2'>
            <IconButton variant="text" sx={{ color: 'white' }} onClick={onDecrementButtonClick}>
                -
            </IconButton>
            <span className='mx-2 fw-bold'>
                {props.count}
            </span>
            <IconButton variant="text" sx={{ color: 'white' }} onClick={onIncrementButtonClick}>
                +
            </IconButton >
        </div>
    );
};

export default IncrementDecrementDiv;