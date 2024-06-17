import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { EmailValidate } from './Components/Store/FormValidation';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from './Components/UI/LoadingSkeleton';
import { ValidateUser } from './Components/APIRequest/api';
import { useDispatch } from 'react-redux';
import { Cookies} from 'react-cookie';

function Login() {
    const [email, newEmail] = useState({ value: "", isValid: false });
    const [password, newPassword] = useState({ value: "", isValid: false });
    const [isButtonClicked, setButtonClicked] = useState(false);
    const cookies = new Cookies();

    const emailChangeHandler = (event) => newEmail({ value: event.target.value, isValid: EmailValidate(event.target.value) });
    const passwordChangeHandler = (event) => newPassword({ value: event.target.value, isValid: EmailValidate(event.target.value) });

    const loginDispatch = useDispatch();
    const onFormSubmit = async (event) => {
        setButtonClicked(true);
        event.preventDefault();
        if (email.isValid && password.isValid) {
            var user = {
                'email': email.value,
                'password': password.value
            }
            await ValidateUser(user).then((result) => {
                if (result) {
                    cookies.set("LogIn", true);
                    loginDispatch({type: 'Logged', value: true});
                }
            });
        }
        setButtonClicked(false);
    }

    return (
        <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
            <form onSubmit={onFormSubmit} className='d-flex align-items-center flex-column w-50'>
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 w-100">
                    <Form.Control placeholder="name@example.com" value={email.value} onChange={emailChangeHandler} style={{ borderColor: email.isValid ? 'black' : 'red' }} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className='w-100'>
                    <Form.Control type="password" placeholder="Password" value={password.value} onChange={passwordChangeHandler} style={{ borderColor: email.isValid ? 'black' : 'red' }} />
                </FloatingLabel>
                {
                    isButtonClicked
                        ? <div className='mt-3'>
                            <LoadingSpinner />
                        </div>
                        : <Button className='w-100 bg-white text-black border border-2 border-black mt-3 fs-4 fw-bold' type='submit'>Log In</Button>
                }
            </form>
        </div>
    );
}

export default Login;