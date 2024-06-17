import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteExpenses } from '../APIRequest/api';

function DeleteModal(props) {

    const reloadDispatch = useDispatch();
    const onDeleteConformYes = () => {
        deleteExpenses(props.id).then((result) =>{
            if(result){
                reloadDispatch({ type: "reload", value: false });
            }
        });
        props.dismissModal(false);
    };

    const onDeleteConformNo = () => props.dismissModal(false);

    return (
        <Modal show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                <h4>Conform Delete</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button className='mx-2 px-3 py-2' onClick={onDeleteConformNo}>No</Button>
                <Button className='mx-2 px-3 py-2' onClick={onDeleteConformYes}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;