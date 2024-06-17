import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from 'react-redux';

const years = [
    2020, 2021, 2022, 2023, 2024
];

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jau", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function Filter(props) {

    const filterDispatch = useDispatch();
    const dataLoadDispatch = useDispatch();

    const onYearChangeHandler = event => {
        dataLoadDispatch({ type: 'reload', value: false });
        filterDispatch({ type: 'year', value: event.target.value });
    };

    const onMonthChangeHandler = event => {
        dataLoadDispatch({ type: 'reload', value: false });
        filterDispatch({ type: 'month', value: event.target.value });
    };

    let monthOptions = [];
    for (let i = 1; i <= 12; i++) {
        monthOptions.push(
            <option key={months[i - 1]} value={i}>{months[i - 1]}</option>
        );
    }

    return (
        <div>
            <select defaultValue={props.selectedValues.selectedMonth} onChange={onMonthChangeHandler} className='px-5 py-2 border border-2 rounded-2 me-2'>
                <option value={0}>All</option>
                {monthOptions}
            </select>
            <select defaultValue={props.selectedValues.selectedYear} onChange={onYearChangeHandler} className='px-5 py-2 border border-2 rounded-2'>
                <option value={0}>All</option>
                {
                    years.map(year => {
                        return (
                            <option key={year} value={year}>{year}</option>
                        )
                    })
                }
            </select>
        </div>
    );
}

export default Filter;