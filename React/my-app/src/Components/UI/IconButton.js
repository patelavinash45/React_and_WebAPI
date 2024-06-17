import 'bootstrap/dist/css/bootstrap.css';

function IconButton(props) {

    const onButtonClickHandler = () => {
        props.onButtonClick();
    }

    return <button onClick={onButtonClickHandler} className='bg-transparent border border-1 text-white btn rounded-3 h-100 me-2'>
        {props.children}
    </button>
};

export default IconButton;