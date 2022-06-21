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
import Users from "./pages/Users";
import {ToastContainer} from "react-toastify";
import AccessDenied from "./components/AccessDenied";

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {

  return (
    <div className={"bg-[#F6F9FF] h-screen"}>
        <Router>
            <div className={"max-w-6xl px-[30px] mx-auto"}>
                <Header />
            </div>

            <div className={"mt-[30px] max-w-6xl mx-auto px-[30px]"}>
                <ToastContainer />
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />
                    <Route path={"/unauthorized"} element={<AccessDenied />} />

                    <Route path={"/profile"} element={<ProtectedRoute />}>
                        <Route path={"/profile"} element={<UserProfile />} />
                    </Route>

                    <Route path={"/users"} element={<ProtectedRoute role={true} />}>
                        <Route path={"/users"} element={<Users />} />
                    </Route>

                    <Route path={"/tickets"} element={<ProtectedRoute />}>
                        <Route path={"/tickets"} element={<Tickets />} />
                    </Route>

                    <Route path={"/new-ticket"} element={<ProtectedRoute />}>
                        <Route path={"/new-ticket"} element={<NewTicket />} />
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
