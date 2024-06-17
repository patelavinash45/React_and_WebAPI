import './Chart.css';
import ChartBar from './ChartBar';

function Chart(props) {
    const dataPointsValues = props.dataPoints.map( dataPoint => dataPoint.value);
    const maxValue = Math.max(...dataPointsValues);

    return (    
        <div className='chart'>
            {
                props.dataPoints.map(dataPoint => {
                    return <ChartBar key={dataPoint.id} dataPoint={dataPoint} maxValue={maxValue} />
                })
            }
        </div>
    );
}

export default Chart;