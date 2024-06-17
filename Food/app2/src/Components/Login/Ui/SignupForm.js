import { Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import CustomInput from './CustomInput';
import { CreateUser } from '../../../API/APICall';
import AlertMessage from '../../Common/AlertMessage';
import { useNavigate } from 'react-router-dom';
import YupPassword from 'yup-password';
YupPassword(Yup);

const SignupForm = () => {
    const navigate = useNavigate();
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isShowAlert, setIsShowAlert] = useState(false);

    const onPasswordIconsClick = () => {
        setIsPasswordShow(previousState => !previousState);
    };

    const logInSchema = Yup.object().shape({
        email: Yup.string().email("Invalid Email.").required("Email is required."),
        password: Yup.string().password("Invalid Password.").required("Password is required."),
        name: Yup.string("Invalid Name.").required("Name is required."),
        phone: Yup.string("Invalid Phone.").required("Phone is required.")
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
        const result = await CreateUser(value);
        if (result.IsSusses) {
            navigate('/Dashboard');
        }
        else {
            setIsShowAlert(true);
        }
    };

    const onLoginButtonClick = () => {
        navigate('/Auth/Login');
    }

    return (
        <Formik
            initialValues={{ email: "", password: "", phone: "", name: "" }}
            validationSchema={logInSchema}
            onSubmit={onFormSubmit}
        >
            {
                ({ errors, touched }) => (
                    <Form className="bg-white d-flex flex-column p-4 rounded-4">
                        <div className='mb-3 fw-bold fs-4 text-center text-primary'>
                            Welcome
                        </div>
                        <Field
                            name='name'
                            component={CustomInput}
                            label='Name'
                            type='text'
                            isValid={errors.name && touched.name}
                            errorMessage={errors.name}
                            startAdornment={<AccountCircleRoundedIcon />}
                        />
                        <Field
                            name='phone'
                            component={CustomInput}
                            label='Phone'
                            type='number'
                            isValid={errors.phone && touched.phone}
                            errorMessage={errors.phone}
                            startAdornment={<PhoneInTalkRoundedIcon />}
                        />
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
                            Sign Up
                        </Button>
                        <div className='d-flex justify-content-between mt-2 mx-1'>
                            <Button variant='text' onClick={onLoginButtonClick} >
                                Log In
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

export default SignupForm;