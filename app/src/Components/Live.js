import LiveMatchHeader from "../Ui/LiveMatchHeader";
import { useParams } from "react-router-dom";

const Live = () => {

    const { id } = useParams();

    return (
        <LiveMatchHeader id={id} />
    );
};

export default Live;