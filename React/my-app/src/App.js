import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './LogIn';
import Dashboard from './Dashboard';
import { useSelector } from 'react-redux';
import { Cookies} from 'react-cookie'

function App() {

  const cookies = new Cookies();
  // const navigate = useNavigate();
  //let isLogIn = useSelector(state => state.logIn);
  let isLogIn = cookies.get("LogIn");
  let logInPath = '/';
  let dashboardPath = '/Dashboard';
  if (isLogIn) {
    dashboardPath = '/';
    logInPath ='/Login';
  }
  // useEffect(() => {
  //   if (isLogIn) {
  //     navigate("/Dashboard");
  //   }
  //   else {
  //     navigate("/LogIn");
  //   }
  // }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={logInPath} element={<Login />} />
        <Route path={dashboardPath} element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
