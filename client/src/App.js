import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className={"bg-[#F6F9FF] h-screen"}>
        <Router>
            <div className={"max-w-7xl px-[30px] mx-auto"}>
                <Header />
            </div>

            <div className={"mt-[30px] max-w-7xl mx-auto px-[30px]"}>
                <ToastContainer />
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />
                    <Route path={"/profile"} element={<ProtectedRoute />}>
                        <Route path={"/profile"} element={<UserProfile />} />
                    </Route>
                    <Route path={"/new-ticket"} element={<ProtectedRoute />}>
                        <Route path={"/new-ticket"} element={<NewTicket />} />
                    </Route>
                    <Route path={"/tickets"} element={<ProtectedRoute />}>
                        <Route path={"/tickets"} element={<Tickets />} />
                    </Route>
                    <Route path={"/tickets/:ticketId"} element={<ProtectedRoute />}>
                        <Route path={"/tickets/:ticketId"} element={<Ticket />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    </div>
  );
}

export default App;
