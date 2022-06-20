import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAuthUser} from "../redux/slices/authSlice/authSlice";

const ProtectedRoute = () => {

    const {isAuthenticated} = useSelector(selectAuthUser);

    return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />

};

export default ProtectedRoute;