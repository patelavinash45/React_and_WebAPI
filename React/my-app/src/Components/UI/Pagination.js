import Pagination from 'react-bootstrap/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

function ShowNoOfPage(props) {
    const activePage = useSelector(state => state.pageNo);
    const totalPages = (props.totalRecords + 4) / 5;

    const pageNoDispatch = useDispatch();
    const dataLoadDispatch= useDispatch();
    const onButtonClick = (event) => {
        dataLoadDispatch({ type: 'reload', value: false });
        pageNoDispatch({ type: 'pageNo', value: event.target.text });
    }

    let items = [];
    for (let i = 1; i <= totalPages; i++) {
        items.push(
            <Pagination.Item key={i} active={i == activePage} className='' onClick={onButtonClick}>
                {i}
            </Pagination.Item>,
        );
    }
    
    return (
        <div className='d-flex justify-content-end mt-3 me-1'>
            <Pagination>{items}</Pagination>
        </div>
    );
}

export default React.memo(ShowNoOfPage);