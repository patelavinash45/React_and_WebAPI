import 'bootstrap/dist/css/bootstrap.css';
import Filter from './Filter';

function ExpenseFilter(props){
    return (
        <div className='d-flex justify-content-between mb-3'>
            <span className='text-white fs-4 fw-bold'>
                Filter
            </span>
            <Filter selectedValues={props}/>
        </div>
    );
}

export default ExpenseFilter;