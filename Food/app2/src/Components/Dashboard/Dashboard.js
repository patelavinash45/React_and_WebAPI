import Header from "./Ui/Header";
import MiddleText from "./Ui/MiddleText";
import Welcome from '../../Images/welcomeImage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemList from "./Ui/ItemList";

const Dashboard = () => {

    return (
        <div className="d-flex align-items-center flex-column">
            <Header />
            <div
                className="position-relative d-flex justify-content-center bg-body-secondary w-100"
                style={{ height: '40vh' }}
            >
                <img src={Welcome} alt="" />
                <MiddleText />
            </div>
            <div className="mt-5">
                <ItemList />
            </div>
        </div>
    );
};

export default Dashboard;