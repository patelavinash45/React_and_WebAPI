import { Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import CustomInput from './CustomInput';
import { ValidateUser, setHeader } from '../../../API/APICall';
import AlertMessage from '../../Common/AlertMessage';
import { useNavigate } from 'react-router-dom';
import YupPassword from 'yup-password';
YupPassword(Yup);

const LoginForm = () => {
    const navigate = useNavigate();
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isShowAlert, setIsShowAlert] = useState(false);

    const onPasswordIconsClick = () => {
        setIsPasswordShow(previousState => !previousState);
    };

    const logInSchema = Yup.object().shape({
        email: Yup.string().email("Invalid Email.").required("Email is required."),
        password: Yup.string().password("Invalid Password.").required("Password is required.")
    });

    const passwordAdornment =
        <IconButton onClick={onPasswordIconsClick} sx={{ m: '0px', p: '0px' }}>
            {
                isPasswordShow ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
        </IconButton>

    const closeAlert = () => {
        setIsShowAlert(false);
    };

    const onFormSubmit = async value => {
        const result = await ValidateUser(value);
        if (result.IsSusses) {
            localStorage.setItem('jwtToken', result.Data.jwtToken);
            setHeader(result.Data.jwtToken);
            navigate('/Dashboard');
        }
        else {
            setIsShowAlert(true);
        }
    };

    const onSignupButtonClick = () => {
        navigate('/Auth/Signup');
    }

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={logInSchema}
            onSubmit={onFormSubmit}
        >
            {
                ({ errors, touched }) => (
                    <Form className="bg-white d-flex flex-column p-4 rounded-4">
                        <div className='mb-3 fw-bold fs-4 text-center text-primary'>
                            Welcome Back
                        </div>
                        <Field
                            name='email'
                            component={CustomInput}
                            label='Email'
                            type='email'
                            isValid={errors.email && touched.email}
                            errorMessage={errors.email}
                            startAdornment={<EmailRoundedIcon />}
                        />
                        <Field
                            name='password'
                            component={CustomInput}
                            label='Password'
                            type={isPasswordShow ? 'text' : 'password'}
                            isValid={errors.password && touched.password}
                            errorMessage={errors.password}
                            startAdornment={<SecurityRoundedIcon />}
                            endAdornment={passwordAdornment}
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            x={{ py: '12px', fontWeight: 'bold' }}
                        >
                            Log In
                        </Button>
                        <div className='d-flex justify-content-between mt-2 mx-1'>
                            <Button variant='text' onClick={onSignupButtonClick} >
                                Sign Up
                            </Button>
                            <Button variant='text' >
                                Forgot Password ??
                            </Button>
                        </div>
                        {
                            isShowAlert
                            && <AlertMessage
                                message='Wrong'
                                alertType='error'
                                closeAlert={closeAlert}
                            />
                        }
                    </Form>
                )
            }
        </Formik>
    );
};

export default LoginForm;