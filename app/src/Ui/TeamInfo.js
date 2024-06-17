import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.css';

const TeamInfo = ({ teamInfo, score, isMatchStarted }) => {

    const teams = [];
    for (let i = 0; i < 2; i++) {
        teams.push(
            <div key={i} className='mb-1 d-flex justify-content-between align-items-center me-4'>
                <span>
                    <img
                        src={teamInfo[i].img}
                        className='rounded-5 me-2 border border-3'
                        style={{ 'maxWidth': '48px', 'maxHeight': '48px' }}
                        alt=''
                    />
                    {teamInfo[i].shortname}
                </span>
                {
                    (isMatchStarted && score[i] !=null)
                    && <span>
                        {score[i].r+"-"+score[i].w+" ("+score[i].o+")"}
                    </span>
                }
            </div>
        );
    }

    return (
        <Grid container direction='column'>
            {teams}
        </Grid>
    );
};

export default TeamInfo;