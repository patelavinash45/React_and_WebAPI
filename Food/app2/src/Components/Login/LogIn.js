import './Login.css';
import { Zoom } from '@mui/material';
import { useParams } from 'react-router-dom';
import LoginForm from './Ui/LoginForm';
import SignupForm from './Ui/SignupForm';

const LogIn = () => {

    const parameters = useParams();

    return (
        <div className='vw-100 vh-100 d-flex justify-content-center align-items-center'>
            <div className='backgroundImage' />
            <Zoom in>
                <div>
                    {
                        parameters.tab == 'Login' ? <LoginForm /> : <SignupForm />
                    }
                </div>
            </Zoom>
        </div>
    );
};

export default LogIn;