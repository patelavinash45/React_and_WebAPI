import './Card.css';

function Card(props) {
    const classes = 'cardDiv ' + props.className;
    return <div className={classes}>{props.children}</div>;
}

export default Card;