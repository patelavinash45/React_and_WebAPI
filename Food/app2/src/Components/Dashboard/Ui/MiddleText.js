import { Paper, Zoom } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';

const MiddleText = () => {
    return (
        <div className="position-absolute" style={{ bottom: '-36px' }}>
            <Zoom in>
                <Paper
                    sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mx: '20px', px: '20px' }}
                >
                    <span className="text-center fs-4 fw-semibold">
                        Delicious Food, Delivered to you
                    </span>
                    <span className="text-center fs-6">
                        Choose your favorite meal from broad section of available meals and enjoy delicious food at your home.
                        All meals are cooked with high quality ingredients, and of course by master chefs.
                    </span>
                </Paper>
            </Zoom>
        </div>
    );
};

export default MiddleText;