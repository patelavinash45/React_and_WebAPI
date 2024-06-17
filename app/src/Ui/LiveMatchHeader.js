import { Nav } from "react-bootstrap";

const LiveMatchHeader = ({ id, name, dateTime, venue }) => {
    return (
        <div>
            <div className='fs-3'>
                {name}
            </div>
            <div className="additionalDetails">
                <span className="me-4">
                    <b>
                        Venue
                    </b>
                    : {venue}
                </span>
                <span>
                    <b>
                        Date
                    </b>
                    : {dateTime}
                </span>
            </div>
            <Nav variant="underline" as='ul' className="">
                <Nav.Item as='li'>
                    <Nav.Link href={`/Live/${id}`} >Live</Nav.Link>
                </Nav.Item>
                <Nav.Item as='li'>
                    <Nav.Link href={`/Scorecard/${id}`} >ScoreCard</Nav.Link>
                </Nav.Item>
            </Nav>
            <hr className="m-0 mb-2" />
        </div>
    );
};

export default LiveMatchHeader;