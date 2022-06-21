import {Navigate, Outlet} from "react-router-dom";
import {useAuthStatus} from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const ProtectedRoute = ({role}) => {
    const {checkingStatus, isAuthenticated, userRole} = useAuthStatus();

    if (checkingStatus) {
        return <Spinner/>
    }

    if (isAuthenticated && role) {
        return isAuthenticated && role === userRole ? <Outlet/> : <Navigate to={"/unauthorized"}/>
    } else {
        return isAuthenticated ? <Outlet/> : <Navigate to={"/login"}/>
    }


};

export default ProtectedRoute;