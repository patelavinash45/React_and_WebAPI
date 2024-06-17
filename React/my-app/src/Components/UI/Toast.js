import Toast from 'react-bootstrap/Toast';

function ShowToaster(props){
    return (
        <Toast bg={props.bgColor} autohide>
            <Toast.Header></Toast.Header>
            <Toast.Body>
                {props.message}
            </Toast.Body>
        </Toast>
    );
}

export default ShowToaster;