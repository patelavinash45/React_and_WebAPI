import { Accordion, Table } from "react-bootstrap";

const ScoreCardView = ({ scoreCards, scoreInfo, id }) => {
    return (
        <Accordion.Item eventKey={id}>
            <Accordion.Header className="shadow-none">
                <div className="d-flex justify-content-between w-100 me-3">
                    <span>
                        {scoreInfo.inning}
                    </span>
                    <span>
                        {scoreInfo.r + "-" + scoreInfo.w + " (" + scoreInfo.o + ")"}
                    </span>
                </div>
            </Accordion.Header>
            <Accordion.Body className="p-0 px-2">
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="col-7">
                                Batter
                            </th>
                            <th className="col-1">
                                R
                            </th>
                            <th className="col-1">
                                B
                            </th>
                            <th className="col-1">
                                4s
                            </th>
                            <th className="col-1">
                                6s
                            </th>
                            <th className="col-1">
                                SR
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scoreCards.batting.map(batter => {
                                return (
                                    <tr key={batter.batsman.id}>
                                        <td>
                                            <div className="d-flex flex-column">
                                                {batter.batsman.name}
                                                <span>
                                                    {batter["dismissal-text"]}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            {batter.r}
                                        </td>
                                        <td>
                                            {batter.b}
                                        </td>
                                        <td>
                                            {batter["4s"]}
                                        </td>
                                        <td>
                                            {batter["6s"]}
                                        </td>
                                        <td>
                                            {batter.sr}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="col-7">
                                Blower
                            </th>
                            <th className="col-1">
                                O
                            </th>
                            <th className="col-1">
                                M
                            </th>
                            <th className="col-1">
                                R
                            </th>
                            <th className="col-1">
                                W
                            </th>
                            <th className="col-2">
                                ECO
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scoreCards.bowling.map(bowling => {
                                return (
                                    <tr key={bowling.bowler.id}>
                                        <td>
                                            {bowling.bowler.name}
                                        </td>
                                        <td>
                                            {bowling.o}
                                        </td>
                                        <td>
                                            {bowling.m}
                                        </td>
                                        <td>
                                            {bowling.r}
                                        </td>
                                        <td>
                                            {bowling.w}
                                        </td>
                                        <td>
                                            {bowling.eco}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default ScoreCardView;