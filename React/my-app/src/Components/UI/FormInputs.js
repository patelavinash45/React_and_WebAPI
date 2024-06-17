import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';

const FormInput = React.forwardRef((props, ref) => {
    const value = ref.current;
    const [isValidValue, setIsValidValue] = useState(props.validateFunction(value));

    const onInputChange = event => {
        setIsValidValue(props.validateFunction(event.target.value));
    }

    return (
        <div className="col-xl-6 col-md-6 col-lg-6 mt-2">
            <input
                defaultValue={value}
                ref={ref}
                onChange={onInputChange}
                className="form-control border-2"
                placeholder={props.placeholder}
                type={props.type}
                style={{ borderColor: isValidValue ? 'black' : 'red' }}
            />
        </div>
    );
});

export default React.memo(FormInput);
