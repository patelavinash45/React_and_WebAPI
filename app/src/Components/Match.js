import { Card } from "react-bootstrap";
import TeamInfo from "../Ui/TeamInfo";
import { useNavigate } from "react-router-dom";

const Match = ({ matchInfo }) => {

    const navigate = useNavigate();
    const onMatchCardClick = () => {
        navigate(`/Live/${matchInfo.id}`);
    };

    return (
        <div className='col-xl-6 col-lg-6' onClick={onMatchCardClick}>
            <Card className='col-xl-6 col-lg-6 m-2 w-100 py-2 px-1'>
                <Card.Subtitle className="mb-2">
                    {matchInfo.name}
                </Card.Subtitle>
                <TeamInfo
                    teamInfo={matchInfo.teamInfo}
                    score={matchInfo.score}
                    isMatchStarted={matchInfo.matchStarted}
                />
                <Card.Subtitle className="mb-1 mt-1 text-primary">
                    {matchInfo.status}
                </Card.Subtitle>
            </Card>
        </div>
    );
};

export default Match;