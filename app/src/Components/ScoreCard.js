import LiveMatchHeader from "../Ui/LiveMatchHeader";
import { useParams } from "react-router-dom";
import { ScoreCardDate as data } from "../data";
import ScoreCardView from "../Ui/ScoreCardView";
import { Accordion } from "react-bootstrap";
import './Css/ScoreCard.css';

const Scorecard = () => {

    const { id } = useParams();
    const scoreCardList = [];
    for (let i = 0; i < 2; i++) {
        scoreCardList.push(
            <ScoreCardView key={i} scoreCards={data.data.scorecard[i]} scoreInfo={data.data.score[i]} id={i} />
        );
    }

    return (
        <div className="container p-3 bg-body-secondary">
            <LiveMatchHeader
                id={id}
                name={data.data.name}
                venue={data.data.venue}
                dateTime={data.data.dateTimeGMT}
            />
            <span className="fs-5">
                {data.data.status}
            </span>
            <Accordion className="mt-2" defaultActiveKey="0" flush>
                {scoreCardList}
            </Accordion>
        </div>
    );
};

export default Scorecard;