import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <div className={"bg-[#F6F9FF] h-screen"}>
        <Router>
            <div className={"max-w-7xl mx-auto border-b border-gray-300"}>
                <Header />
            </div>

            <div className={"mt-[30px] max-w-7xl mx-auto"}>
                <ToastContainer />
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />
                </Routes>
            </div>
        </Router>
    </div>
  );
}

export default App;
