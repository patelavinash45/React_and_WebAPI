import { Snackbar, Alert } from "@mui/material";

const AlertMessage = props => {

    const onCloseAlert = () => {
        props.closeAlert();
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={true}
            autoHideDuration={1000}
            onClose={onCloseAlert}
        >
            <Alert
                severity={props.alertType}
                sx={{ width: '100%' }}
                variant="filled"
            >
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default AlertMessage;