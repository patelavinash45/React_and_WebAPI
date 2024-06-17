import './ChartBar.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from 'react-redux';

function ChartBar(props) {

    let barFillLength = '0%';
    if (props.maxValue > 0) {
        barFillLength = Math.round((props.dataPoint.value / props.maxValue) * 100) + "%";
    };

    const monthDispatch = useDispatch();
    const dataLoadDispatch = useDispatch();
    const pageNoDispatch = useDispatch();
    const onButtonClickHandler = () => {
        dataLoadDispatch({ type: 'reload', value: false });
        monthDispatch({ type: 'month', value: props.dataPoint.id }); 
        pageNoDispatch({ type: 'pageNo', value: 1 });
    }

    return (
        <button className='bg-transparent border-0' disabled={barFillLength == '0%'} onClick={onButtonClickHandler}>
            <div className='chart-bar'>
                <div className='chart-bar__inner'>
                    <div className='chart-bar__fill' style={{ height: barFillLength }}></div>
                </div>
                <div className='chart-bar__label'>
                    {props.dataPoint.label}
                </div>
            </div>
        </button>
    );
}

export default ChartBar;