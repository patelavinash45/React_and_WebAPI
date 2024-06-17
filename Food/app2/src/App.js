import Dashboard from "./Components/Dashboard/Dashboard";
import LogIn from "./Components/Login/LogIn";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/Auth/Login" />} />
      <Route path="/Auth/:tab" element={<LogIn />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
